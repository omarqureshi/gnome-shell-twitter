const Lang = imports.lang;
const Mainloop = imports.mainloop;

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let text, button;

function _hideMessage() {
  Main.uiGroup.remove_actor(text);
  text = null;
}

function _showMessage() {
  if (!text) {
    text = new St.Label({ style_class: 'helloworld-label',
                          text: "Lorem ispum!" });
    Main.uiGroup.add_actor(text);
  }

  text.opacity = 255;

  let monitor = Main.layoutManager.primaryMonitor;

  text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
                    Math.floor(monitor.height / 2 - text.height / 2));

  Tweener.addTween(text,
                   { opacity: 0,
                     time: 0.5,
                     transition: 'easeOutQuad',
                     onComplete: _hideMessage });
}

function init() {
  button = new St.Bin({ style_class: 'panel-button',
                        reactive: true,
                        can_focus: true,
                        x_fill: true,
                        y_fill: false,
                        track_hover: true });
  let icon = new St.Icon({ icon_name: 'system-run',
                           icon_type: St.IconType.SYMBOLIC,
                           style_class: 'system-status-icon' });

  button.set_child(icon);
  // refreshTimer();
  //  button.connect('button-press-event', _showHello);

}

function refreshTimer() {
  _showMessage();
  Mainloop.timeout_add_seconds(1, refreshTimer);
}

function enable() {
  Main.panel._rightBox.insert_actor(button, 0);
}

function disable() {
  Main.panel._rightBox.remove_actor(button);
}
