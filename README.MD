# SixtyFour mod injector

## setup
### Setup files
- Go to steam Sixty Four install folder (like `steamapps\common\Sixty Four`)
- Go to game folder (like `steamapps\common\Sixty Four\win-unpacked\resources\app\game`)
- Create a `mods` folder
- Download `injector.js` and put it mods folder

### Edit main.html

Now you need edit `steamapps\common\Sixty Four\win-unpacked\resources\app\game\main.html`

You need to add next line at the end of the `<head></head>` tag.
```html
        <script type="text/javascript" src="mods/injector.js?v=2"></script>
```

You should have something like that :
```html
<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8" />
        <title>Sixty Four</title>
        <link rel="stylesheet" href="./font/montserrat.css" type="text/css" charset="utf-8" />
        <script type="text/javascript" src="scripts/bezier.js"></script>
        <script type="text/javascript" src="scripts/ui.js?v=2"></script>
        <script type="text/javascript" src="scripts/sprites.js?v=2"></script>
        <script type="text/javascript" src="scripts/stuff.js?v=2"></script>
        <script type="text/javascript" src="scripts/words.js?v=2"></script>
        <script type="text/javascript" src="scripts/codex.js?v=2"></script>
        <script type="text/javascript" src="scripts/game.js?v=4"></script>
        <script type="text/javascript" src="mods/injector.js?v=2"></script>
        <style/>...<style/>
</head>
<body>
...
</body>
</html>
```

## Install mod

In the mods folder juste put a dir with the mod contents in it.

## Create mod

### mod.json

WARN: dependencies will work in future update

```json
{
  "id": "mod_id_name",
  "version": "0.0.1",
  "js": "mod_js.js",
  "css": [
    "mod_css.css"
  ],
  "dependencies": {
    "mod_dep": "^0.0.1"
  }
}
```
#### js
in you script file you should export A loader object like this : 
```js

function getLoader() {
    return {
        getCodex() {
            return {}
        },
        init() {
            
        },
        inject() {
        }
    }
}

module.exports = {getLoader}

```
All function is not required
- getCodex() => should return an object to be merged with game codex
- init() => call before game init could be used to load resources
- inject() =>  call after all mods init but before game init should be used to inject modification before game start

#### css
just a simple css file(s) to be load