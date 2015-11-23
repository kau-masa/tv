# Smart TV Demo #

### Setup ###

* Install [Nodejs](https://nodejs.org/en/download/) on your computer;
* Install [Chrome](https://www.google.fr/chrome/browser/desktop/) on your computer.

Once prerequisites installed, configure the web application to use your **craft ai** project.

1. Go to [craft ai workbench](https://workbench.craft.ai/),
2. Edit the TV project,
3. Click on the `craft_project.json`, notice the `Application ID` and `Application secret` values
4. Update variables in file `src/constants.js`:
 * `SH_APP_ID` is the `Application ID` showed `craft_project.json`,
 * `SH_APP_SECRET` is the `Application secret` showed `craft_project.json`,
 * `SH_USER` is your github login name
 * `SH_PROJECT` is the name of the github projet  (should be `tv` in you've just forked the project without renaming),
 * `SH_VERSION` is the version of the github projet (should be `master`)
 5. In the web application file `src/view/containers/app.jsx`, your can specify the main bt in line 34,
 `return Runtime.createAgent( 'demo1/SayHello.bt', {} )`

### Web app  ###

To install dependencies, run `npm install` in a console or terminal

To launch an autoreloading server on <http://localhost:4010>, run `npm run dev` in a console or terminal

This web application features a smartPhone (named `craftPhone`) and a smartTV (named `craftTV`). These devices expose some data that can be handle with **craft ai**.
* `craftTV`:
 * attribute `state`: possible values are `on`, `off` (string)
 * attribute `pause`: possible values are `true` or `false` (boolean)
 * attribute `volume`: possible values any integer between `0` and `100`
* `craftPhone`:
 * attribute `state`: possible values are `isCalling`, `isRinging` and  `standBy` (string)

To play visually with application you can:

- click on the home button of the `craftPhone`, to make calls
- Click on the On/Off button of the `craftTV` remote to turn on/off the TV.
- Click on the volume `+`/`-` button of the `craftTV` remote to lower or increase the TV volume.
- Click on the `STB` button of the `craftTV` remote to pause or not the TV.

With **craft ai**, we can make intelligent automation with these devices using [behaviors](http://doc.craft.ai/behaviors/index.html). Basically each device exposes [actions](http://doc.craft.ai/behaviors/actions/index.html) and data that **craft ai** can handle in the behaviors using [actions nodes](http://doc.craft.ai/tutorials/doc/1/index.html).
The exposed `actions` are:
* `Speech`, this function makes the craft assistant in the smartPhone.
Input parameter:
 * `message`: the text that will be displayed in the craftPhone assistant

* `SetDeviceValue`, this function sets a specific value to a device.
Input parameters:
 * `device`: the device name (`craftPhone` or `craftTV`)
 * `attribute`: the device attribute to set (see above for the possible attributes of the related device)
 * `value`: the device attribute value to set (see above for the possible value of the related device attribute)

* `GetDeviceValue`, this function retrieves a specific value from a device.
Input parameters:
 * `device`: the device name (`craftPhone` or `craftTV`)
 * `attribute`: the device attribute to set (see above for the possible attributes of the related device)
 attribute)
 Output parameters:
 * name of the attribute you want to retrieve (`state` or `pause` or `volume` for `craftTV` or just `state` for `craftPhone`)

### Run the different demos ###

There are 6 demos bt:

#### `SayHello` demo ####

This demo uses behavior file `demo1/SayHello.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

It's a simple demo that involve a simple action that helps understanding behavior update

#### `TurnOnTVandReceiveCall` demo ####

This demo uses behavior file `demo2/TurnOnTVandReceiveCall.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

This demo involves 2 actions and a [sequence node](http://doc.craft.ai/behaviors/sequence/index.html) that helps understanding how some actions can be sequentially executed.

#### `AdaptTvVolumeWhenCalling` demo ####

This demo uses behavior file `demo3/AdaptTvVolumeWhenCalling.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

This demo is the first one that brings a small intelligent automation between the `craftPhone` and `craftTV`. It introduces 2 new nodes, [priority node](http://doc.craft.ai/behaviors/priority/index.html) and a [condition node](http://doc.craft.ai/behaviors/condition/index.html), and involves the agent [knowledge](http://doc.craft.ai/instance_and_agents/index.html) using action node output parameters.

If a call occurs when the TV is on, the TV lowers automatically the volume then sets back a higher volume when the call is finished. This shows how a **craft ai** application can take into account a context.

#### `DoSomethingOnlyOnce` demo ####

This demo uses behavior file `demo4/DoSomethingOnlyOnce.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

This demo only shows a useful pattern which allows to do something (here an action) only once.
It introduces 2 new nodes,[until node](http://doc.craft.ai/behaviors/until/index.html) and a [status node](http://doc.craft.ai/behaviors/status_decorators/index.html).

#### `LearnTvVolume` demo ####

This demo uses behavior file `demo5/LearnTvVolume.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

In this demo, the smartTV learns the tv volume the user prefers before and during a call. This shows how a **craft ai** application can can take into account user's preferences.

#### `Final` demo ####

This demo uses behavior file `demo5/Final.bt` (make sure this file is used as the main behavior in `src/view/containers/app.jsx` line 34).

This demo shows a complete solution around the smartTV that adapts itself to the user interactions (volume and pause learning), to the smartPhone state and the home presence.
Play with it, then let your imagination creates some new uses cases:
ex:
 * Learn tv volume **or** tv pause state instead of both at the same time,
 * If you have web development skills, improve the web application by adding new actions (in `src/actions.js`) and new objects/compoment. (in `src/view/components`)


### More ###

If you have to have a develop your craft ai skills, just follow our [tutorials](http://doc.craft.ai/tutorials/index.html) and read our [documentation](http://doc.craft.ai/index.html)

If you have any questions, please contact our [support]('mailto:support@craft.ai')
