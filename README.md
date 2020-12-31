# library.cerulean

A fork of [cerulean.matrix.org](https://cerulean.matrix.org) (and [r4.cerulean](https://github.com/internet4000/r4-cerulean)), to test and see what this whole can do.

Trying to use the matrix messages and rooms to allow users to publish media, text and link content.


# Cerulean

Cerulean is a highly experimental [Matrix](https://matrix.org) client intended to
demonstrate the viability of freestyle public threaded conversations a la Twitter.

As such, it is built as simply as possible, in order to demonstrate to someone
unfamiliar with Matrix how the Client Server API can be used in this manner.
It has no dependencies (other than create-react-app) and has no optimisations.
It uses a naive View+Model architecture for legibility (although ideally it'd
grow to be MVVM in future).

For more info, see https://matrix.org/blog/2020/12/18/introducing-cerulean


## To Run dev server

```
yarn install
yarn start
```

## License

All files in this repository are licensed as follows:

```
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
