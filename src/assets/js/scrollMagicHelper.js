import ScrollMagic from "scrollmagic";

const controller =
  typeof window === "undefined"
    ? false
    : new ScrollMagic.Controller({ refreshInterval: 500 });

const safeAddScene = options => {
  if (typeof window === "undefined" || !controller) {
    return {
      destroy() {
        return false;
      }
    };
  }

  const { _enter, _leave } = options;

  delete options._enter;
  delete options._leave;

  const sms = new ScrollMagic.Scene(options);
  if (_enter) {
    sms.on("enter", _enter);
  }
  if (_leave) {
    sms.on("leave", _leave);
  }
  sms.update();
  sms.addTo(controller);

  return sms;
};

export default safeAddScene;
