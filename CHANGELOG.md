# Changelog

## 0.13.2

- main
  - osc input port (`-o`) is now set to the http port (`-p`) by default

## 0.13.1

- bug fixes
  - regression preventing received osc messages to be properly routed to widgets with `preArgs`
- debug
  - errors occuring in the browser process are now piped to the main process' console with the source file name and the line number.

## 0.13.0

- main
  - **new** `-b / --blank` option to start editing a new session directly
  - **new** `--disable-vsync` option that improves performance (reduce input lag) on some systems
  - some inconsistent parameter combinations are now prevented
  - firefox compatibility improved (yet not perfect)
  - launcher window is no longer of the `splash` type, as it was difficult to close with some window managers
- widgets
  - **new** `modal` container : a button that turns into a fullscreen panel when clicked.
  - sliders/xy: add `spring` option that makes that widget jump back to its initial value when released
  - fader: horizontal mode default height fixed
  - keyboard: black keys pressed state is more noticeable
  - matrices: added `start` option to choose the first subwidget's `id`
  - labels' height reduced
- editor
  - **new** snap-to-grid feature
  - widgets' min-width set to grid's width
- misc
  - building with node 4 is fixed

## 0.12.0

- bug fixes
  - error popups raised by the main process can be closed
  - sliders don't send same value over network when the value change is below the widget's precision
- widgets
  - **new** (piano) keyboard widget
  - matrices: fixed `preArgs` option; added `split` option (default to `false`), *this changes the default osc messages formatting for these widgets*
  - icons in labels are inserted using the `^` prefix
  - text: icons support in value
- tabs
  - icons support in label
- misc
  - fontawesome update (4.7.0)

## 0.11.6

- widgets
  - meter: rewritten using fader as base
  - strip: center widget horizontally if width is set
  - fader/knob: compact gauge's alpha varies slightly as the distance to the origin grows
- misc
  - one example session added

## 0.11.5

- bug fixes
  - [regression] broken horizontal fader and pads

## 0.11.4

- bug fixes
  - fader: default `height/width` not set when `top/left` is `auto`

## 0.11.3

- widgets
  - knob: gesture's precision is proportionnal to the widget's size
  - fader: `height:auto` (or `width` for `horizontal` mode) makes the fader expand automatically
- ui
  - cleaner forms in editor and launcher

## 0.11.2

- touch
  - using multiple fingers to control a widget increases the precision (reduces the gesture's computed speed)
- widgets
  - fader: display pips in `compact` mode when `range` has multiple breakpoints
  - pads: display pips when `range` has multiple breakpoints
  - multixy: style update (stroked dots, bold number font); `snap` option added; points are automatically assigned to touches as they come; fix `logScale(X|Y)` options

## 0.11.1

- bug fixes
  - meters in faders were not always properly positionned
- widgets
  - knob: gauge's width is proportionnal to the knob's size in `compact` mode; widget's content centering fixed; `compact` style update;

## 0.11.0

- bug fixes
  - `-g / --no-gui` not preventing the launcher from spawning
  - `-e / --examples` not correctly parsed
- main
  - launcher displays options descriptions for booleans too
- widgets
  - added generic `value` option for setting a widget's initial value (does not sync linked widgets nor send osc message)
  - **text** widget's `defaultText` replaced with `value`
  - multixy dots are drawn with filled background instead of stroke

## 0.10.4

- main
  - launcher displays new version if available
  - launcher stays opened after starting the server and/or the gui except if `--gui-only` is set

## 0.10.3

- main
  - launcher: resetting boolean option properly sets it to false
  - launcher: display package's version
  - guis: adjust window's background to match the app's
- ui
  - launcher and session lobby appear more smoothly

## 0.10.2

- main
  - when executing the app with no CLI argument, a launcher window is created allowing user to adjust settings before starting the server (config is saved in the user's directory)

## 0.10.1

- bug fixes
  - rgb: minor visual glitch on extreme value, drawing performance improved
  - main: examples sessions path are properly stored as absolute paths (fixes `-e / --examples` mode)
- ui
  - lobby: session file names are diplayed first, then shortened paths
- misc
  - widgets `precision` doesn't affect their visual interraction accuracy since values are now rounded only before osc sending

## 0.10.0-alpha-2

- bug fixes
  - [windows] fix long path issue (#35) returns

## 0.10.0-alpha

- main
  - **new** `-c / --custom-module` switch allowing user to define custom osc filtering fonctions
  - `address` is now used everywhere instead of `path` to describe osc address to avoid confusion. Session files using the old `path` option for widgets are still supported.
  - **osc bundles** are properly received (subsequent messages are processed separately with a delay if the timetag is set)
  - widgets can be edited via osc messages using the special `/EXEC` address

## 0.9.2

- bug fixes
  - [windows] fix long path issue (#35)

## 0.9.1

- widgets
  - multiXy: added `pointSize` option; made default size bigger; points don't overflow the pad anymore

## 0.9.0

- widgets
  - **new** `multixy` pad
- misc
  - rewritten `pads` with prototype inheritance and using faders under the hood to handle events (this adds *fader*'s `range` capabilities to *xy*)
- engine
  - electron 1.4.4

## 0.8.3

- bug fixes
  - scrollbar arrows not showing
  - `fader` pips position when `noPip` is `true`
- widgets
  - matrices : all `fader`, `push` and `toggle` options are now available to `multifader`, `multipush` and `multitoggle`

## 0.8.2

- bug
  - avoid crash when sending osc with incorrect typetags
  - fixed fallback typetag ('s')
  - fixed broken `null` value for `push` & `toggle`

## 0.8.1

- bug
  - broken `fader` with `horizontal` set to `true` and `compact` set to `false`
- widgets
  - remove margins from `plots`
  - added `origin` options to `plots`

## 0.8.0

- main
  - the headless server/clients model is now the only one beeing used : the GUI mode is nothing more than an embedded chromium (electron) client
  - when a new client opens a session on the server, it is synchronized with the other clients
  - **new switches** : `--no-gui`, `--gui-only`, `--port`, `--osc-port`, `--version` (see docs)
- ui
  - explicit loadings
- widgets
  - make push's backlight only respond to external osc messages (not to synchronization messages from other widgets or clients)
  - removed special `false` value case for push/toggles (which used to disable osc sending)
  - add `norelease` option to `push` for disabling osc messages when releasing the button
  - `true` and `false` values are now properly sent as boolean
  - **args type definition** in `preArgs` option now uses the osc typetags only ('f', 'i', 'T', 'F', etc)
- engine
  - electron 1.4.3
- misc
  - rewritten matrices with prototypes inheritance

## 0.7.0

- bug fixes
  - osc messages with 0-item and 1-item args are correctly unpacked and routed
  - buttons can handle messages with 0 arg if one of their state has the value "null"
- ui
  - nice and bigger scrollbar
  - right-click no longer starts a dragging gesture
- editor
  - copy/paste data auto-incrementation fix
- widgets
  - new equalizer plotter
  - push/toggles made more obvious
  - knob's new options: angle and origin
  - fader's new option: origin
- engine
  - electron 1.4.1 (chrome 53, node 6.5.0)
- misc
  - added `--examples` switch for showing the availabe example sessions instead of the history
  - rewritten sliders and plots using canvas and prototypes inheritance
  - reorganized package using the two-package.json structure: js and css assets are now create at build time, and only necessary dependencies are shipped with the app

## 0.6.3

- bug fixes
  - regression (since 498ba4a06adf63d76fe7181691299c1cc55e8240) breaking the editor on touch devices

## 0.6.2

- cool stuff
  - armv7l prebuilt binaries ! (raspberry 2, etc)
- engine
  - electron 1.3.5

## 0.6.1

- bug fixes
  - editor: widgets/tabs can be accessed through their parent's children list (#27)
- engine
  - electron 1.3.1

## 0.6.0

- bug fixes
  - pasted widget properly use the pointer's position
  - traversing gestures are effective from the first touch, not after the first move
  - out-of-range values are properly clipped by faders/knob
- ui
  - Faders & Meters design improved
  - The main font (droid sans) is now loaded...
  - Knob's sizing got smarter
  - Widgets don't blink not jump when they appear for the first time or when they resize
- misc
  - Fader's `align` option replaced with boolean option `alignRight`
  - Widget's `label` now accepts special directive `icon: fontawesome-class` to display icons from [FontAwesome](http://fontawesome.io/icons/)
  - Text widget `defaultText` option added
- engine
  - electron 1.2.2

## 0.5.4

- bug fixes
  - [desktop] menu bar auto-hide
  - [headless] multitouch support
- ui
  - [mobile] better faders pips rendering
  - fixed horizontal fader knob centering
  - [mobile] better numeric inputs rendering (not blurred anymore)
- engine
  - [desktop] electron 1.2.0 (chrome 51)

## 0.5.3

- bug fixes
  - [again] touch fake-right-click only fires on long touch, not after every tap
  - traversing gestures bug with touch
- misc
  - better mouse/touch drag events handlers
- engine
  - electron 1.1.1

## 0.5.2

- bug fixes
  - touch fake-right-click only fires on long touch, not after every tap

## 0.5.1

- bug fixes
  - feedback is now handled precisely by widets (ie not rounded according to the `precision` option, see issue #21)
- engine
  - electron 1.1.0

## 0.5.0

- bug fixes
  - touch/mouse events are both handled simultaneously, module rewritten for better performances (see issue #18)
- engine
  - electron 1.0.2


## 0.4.8

- bug fixes
  - regression preventing newly created widgets from using the pointer's coordinates as position
  - add 0.4.7's fix to headless mode

## 0.4.7

- bug fixes
  - regression causing widgets with `preArgs` to not receive osc correctly

## 0.4.6

- engine
  - electron 0.37.6
  - node-osc 2.0.3
- features
  - `compact` option added to knob and fader
  - if an osc input port is specified, osc messages will be sent from it. This enhances compatibility with apps that send their feedback messages directly to the sender.
- misc
  - mouse/touch dragging handler rewritten, now using event delegation and direct handler calls instead of DOM event bubbling whenever it's possible

## 0.4.5

- engine
  - electron 0.37.3
- ui
  - new logo
  - better lobby design
- misc
  - renamed sliders/pads' `absolute` property to `snap`

## 0.4.4

- bug fixes
  - [headless] scripts are no longer bundled on the fly, it didn't work on some systems
  - touching widgets without changing their value doesn't make them send the same value again anymore
- ui
  - slightly tightened layout
- features
  - `noPip` option added to knob and fader
  - `preArgs` accepts object if the arg's type needs to be specified
  - knob supports breakpoints scale, same as fader's
  - fader and knob pip scales now support custom label
  - a push/toggle's value can be set to `null` if only the path needs to be sent in the osc messages
  -  push buttons do not update their own leds and return their value (for state save and widgets sync) based on their last changed property (led state or touch on/off)
- misc
  - refining the fader's pip scale that looked choppy on mobile devices. All pips are now evenly spaced, not relatively to the fader's height.
  - [desktop mode] saved sessions are added to history

## 0.4.3

- features
  - text widget can be `vertical`
  - panel widget `scroll` option
- bug fixes
  - smart pasting now works when the clipboard contains several widgets whose unsuffixed ids are the identical
  - osc received array that contain only one item are correctly unpacked (fixes cross-app sync for widgets that don't accept array, broken since the introduction of `preArgs`)
  - memory leak when loading a new session (cached tabs were not properly purged)
- misc
  - push widget doesn't fire its 'on' value if pressed while stuck in 'on' position
  - panel widgets don't have inner margins anymore
  - fader widget optimization : the pip scale is generated from a single gradient plus some elements for each breakpoint (instead of one element per percent), thus reducing the number of elements to draw.

## 0.4.2

- features
  - new widget : text (just displays received values)
- bug fixes
  - widget linking doesn't cause multiple unwanted osc sends anymore

## 0.4.1

- features
  - `preArgs` option for widgets (prepends constants to osc messages args)

## 0.4.0

- engine
  - electron 0.37.2 (chrome 49)
- ui
  - new flat ui
  - tab system rewritten : inactive tabs are detached from the DOM tree, thus improving performances while slowing down tab switching.
  - widget categories in editor's context menu
- features
  - logarithmic scaling (log10) support added to knob, fader & xy
  - mousewheel support added to knob and fader (ctrlKey for fine control)
  - new widgets : plot, visualizer & meter. Fader built-in feedback meter option
  - traversing gestures switch in sidepanel
  - custom color property for all widgets with inheritance (containers)
  - editor pasting function now smartly increments widget's id and path while keeping label if different from default
  - true theming support
- misc
  - sync/link event handling improved
  - stylesheets cannot be recompiled on the fly anymore (`--c` switch removed)
  - **new state save file format, no backward compatibility**

## 0.3.1

- electron updated to 0.36.11
- editor paste menu lets you choose between `Same ID` (cloned widgets) or `New ID` (resets id, label, linkId, and path)
- minor style updates

## 0.3.0

- 3 new widgets
	- multifader
	- multitoggle
	- multipush


## 0.2.1

- style update (push/toggle widgets, widgets' dragging handle)
- widget dragging/resizing doesn't get broken when editing the root
- sidepanel toggle doesn't select root for edition anymore

## 0.2.0

- editor code rewriting
	- right-click context-menu quick editing (widget copy/cut/paste, add & delete tabs/widgets)
