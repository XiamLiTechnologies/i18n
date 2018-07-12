# i18n

[![Release](https://img.shields.io/badge/release-1.2.0-brightgreen.svg)]()
[![License](https://img.shields.io/github/license/XiamLiTechnologies/i18n.svg)]()
[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)]()

Very simple yet powerful internalization (i18n) library for javascript.

## Installation

Just add one of the following scripts to your website:

#### Not minified
```html
<script src="https://cdn.xiamli.com/i18n-1.2.0.js" integrity="sha384-7G7CDQp8QwWz4ojzoMH/mCbo7Mox/KW9VB86YH8xlJYcwHrHuf9E4Crxk8Z5dx9t" crossorigin="anonymous"></script>
```
```html
<script src="https://cdn.rawgit.com/XiamLiTechnologies/i18n/4f6909ca44ec2ed247e882eb53be92504d7c2abb/i18n.js" integrity="sha384-7G7CDQp8QwWz4ojzoMH/mCbo7Mox/KW9VB86YH8xlJYcwHrHuf9E4Crxk8Z5dx9t" crossorigin="anonymous"></script>
```

#### Minified
```html
<script src="https://cdn.xiamli.com/i18n-1.2.0.min.js" integrity="sha384-r4RLiw0da8QqcoAaaPrJMpSor/HKKq2HCBGsat8FWYPVXYSlKteZuaqBjs5iytv1" crossorigin="anonymous"></script>
```

## Usage
After adding the script to your website you're ready to go.
Just go and translate some stuff, for example:

Change this:

```html
<h2>Hello</h2>
```

to this:

```html
<h2 i18n="hello"></h2>
```

And add the corresponding language files to "i18n/":

i18n/en.js:
```json
{
  "hello": "Hello"
}
```

i18n/de.js:
```json
{
  "hello": "Hallo"
}
```

i18n/es.js:
```json
{
  "hello": "Hola"
}
```
  
If you don't set a language (for example via a language switcher or something like that) it'll try to use the language of the user's browser and if this doesn't exist it'll fallback to english.

So if you're coming from spain and therefore your browsers language is espanol, you would be displayed:

```html
<h2>Hola<h2>
```

## Latest Release

Version 1.2.0

# Author
  - Dorian H. - <dorian@xiamli.com> / <dorian@d0x7.com> - https://d0x7.com
	
# Copyright and License

Copyright © 2018 XiamLi Technologies

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
