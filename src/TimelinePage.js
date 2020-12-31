import React from "react";
import "./TimelinePage.css";
import Message from "./Message";
import InputPost from "./InputPost";
import { createPermalinkForTimelineEvent } from "./routing";

// TimelinePage renders an aggregated feed of all timelines the logged in user is following.
// Props:
//  - client: Client
class TimelinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            timeline: [],
            fromToken: null,
            trackingRoomIds: [],
        };
    }

    async componentDidMount() {
        await this.loadEvents();
        this.listenForNewEvents(this.state.fromToken);
    }

    listenForNewEvents(from) {
        let f = from;
        this.props.client
            .waitForMessageEventInRoom(this.state.trackingRoomIds, from)
            .then((newFrom) => {
                f = newFrom;
                return this.loadEvents();
            })
            .then(() => {
                this.listenForNewEvents(f);
            });
    }

    onPost() {
        // direct them to their own page so they see their message
        window.location.href = "/" + this.props.client.userId;
    }

    async loadEvents() {
        this.setState({
            loading: true,
        });
        try {
            let timelineInfo = await this.props.client.getAggregatedTimeline();
            if (timelineInfo.timeline.length === 0) {
                /* window.location.href = "/" + this.props.client.userId; */
            }
            let roomSet = new Set();
            for (let ev of timelineInfo.timeline) {
                roomSet.add(ev.room_id);
            }
            this.setState({
                timeline: timelineInfo.timeline,
                fromToken: timelineInfo.from,
                trackingRoomIds: Array.from(roomSet),
            });
        } catch (err) {
            this.setState({
                error: JSON.stringify(err),
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    onReplied(parentEvent, eventId) {
        const link = createPermalinkForTimelineEvent(parentEvent);
        if (!link) {
            return;
        }
        window.location.href = link;
    }

    render() {
        let timelineBlock;
        let errBlock;
        let hasEntries = false;
        if (this.state.error) {
            errBlock = (
                <div className="errblock">
                    Whoops! Something went wrong: {this.state.error}
                </div>
            );
        } else {
            if (this.state.loading) {
                timelineBlock = (
                    <div className="emptyList"> Loading timeline.... </div>
                );
            } else {
                timelineBlock = (
                    <div>
                        {this.state.timeline
                            .filter((ev) => {
                                // only messages
                                if (ev.type !== "m.room.message") {
                                    return false;
                                }
                                // only messages with cerulean fields
                                if (
                                    !ev.content["org.matrix.cerulean.event_id"]
                                ) {
                                    return false;
                                }
                                return true;
                            })
                            .map((ev) => {
                                hasEntries = true;
                                return (
                                    <Message
                                        key={ev.event_id}
                                        event={ev}
                                        isTimelineEvent={true}
                                        onPost={this.onReplied.bind(this)}
                                    />
                                );
                            })}
                    </div>
                );
                if (!hasEntries) {
                    timelineBlock = (
                        <div className="emptyList">
                            Not much to see yet. Check {" "}
                            <a
                                href={
                                    "/@library:dendrite.matrix.org"
                                }
                            >
                                matrix cerulean library test
                            </a>
                        </div>
                    );
                }
            }
        }

        let title;
        if (hasEntries) {
            title = <div className="timelineTitle">What's going on</div>;
        }         

        let userPageBody = (
            <div>
                <div className="UserPageBody">
                    {title}
                    {timelineBlock}
                </div>
            </div>
        );

        return (
            <div className="UserPage">
                {errBlock}
                {userPageBody}
            </div>
        );
    }
}

export default TimelinePage;
