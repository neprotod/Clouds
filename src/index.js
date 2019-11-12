class Sky {
  constructor({
    speedStart = 30,
    speedEnd = 80,
    zIndexStart = 2,
    zIndexEnd = 11
  } = {}) {
    this.speedStart = speedStart;
    this.speedEnd = speedEnd;
    this.zIndexStart = zIndexStart;
    this.zIndexEnd = zIndexEnd;

    // All object Cloud
    this.allClouds = [];

    //Parent element
    this.parent = document.getElementById("clouds_place");

    this.clientWidth = this.parent.clientWidth;

    // Create animation function
    window.requestAnimFrame = (function(callback) {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 300);
        }
      );
    })();
  }

  /**
   * For prepare random number
   *
   * @param {number} minRandom
   * @param {number} maxRandom
   * @return {number} random namber
   */
  getRandom(minRandom, maxRandom) {
    var range = maxRandom - minRandom + 1;
    return Math.floor(Math.random() * range) + minRandom;
  }

  /**
   * Connection all cloud in clouds_place element
   *
   * @return {boolean} true when all good
   */
  connectionAllClouds() {
    let clouds = this.parent.querySelectorAll(".cloud");
    clouds.forEach(elem => {
      this.addClouds(elem);
    });

    return true;
  }

  /**
   * Connection cloud
   *
   * @param {Object} div           element
   * @param {Object} Obj           params
   * @param {number} Obj.leftStart start left border
   * @param {number} Obj.leftEnd   end left border
   * @param {number} Obj.topStart  start top border (default -50)
   * @param {number} Obj.topEnd    end top border (default 300)
   * @return {void}
   */
  addClouds(
    div,
    { leftStart = 0, leftEnd = null, topStart = -50, topEnd = 300 } = {}
  ) {
    if (!div) throw new Error("Element is null");
    //Default data
    if (!leftEnd) {
      leftEnd = this.clientWidth;
    }
    const randomLeft = this.getRandom(leftStart, leftEnd);
    const randomZindex = this.getRandom(this.zIndexStart, this.zIndexEnd);

    const randomSpeed = this.getRandom(this.speedStart, this.speedEnd);
    const randomTop = this.getRandom(topStart, topEnd);

    // Sample parent class
    const object = this;

    // Time to animation
    const time = Date.now();

    // Config for cloud
    const config = {
      randomLeft,
      randomZindex,
      randomSpeed,
      randomTop,
      topStart,
      topEnd,
      div,
      time,
      object
    };

    this.allClouds.push(new Cloud(config));
  }

  /**
   * Start animation
   *
   * @return {void}
   */
  start() {
    this.clientWidth = this.parent.clientWidth;

    this.allClouds.forEach(elem => {
      elem.goClouds();
    });

    window.requestAnimationFrame(() => {
      this.start();
    });
  }
}

class Cloud {
  /**
   *
   * @param {Object} config configuration this cloud
   */
  constructor(config) {
    for (let key in config) {
      this[key] = config[key];
    }

    // With element
    this.divWidth = this.div.clientWidth;
  }

  /**
   * Clear cloud possition before next stap animation
   *
   * @return {void}
   */
  clearCloupPosition() {
    this.div.style.left = -this.divWidth + "px";
    this.randomTop = this.object.getRandom(this.topStart, this.topEnd);
    this.randomSpeed = this.object.getRandom(
      this.object.speedStart,
      this.object.speedEnd
    );

    // Add data frame
    this.time = Date.now();

    this.randomZindex = this.object.getRandom(
      this.object.zIndexStart,
      this.object.zIndexEnd
    );
    this.goClouds(true);
  }

  /**
   * Step animation cloud
   *
   * @param {boolean} force if need to force replace value in cloud
   */
  goClouds(force = false) {
    if (Date.now() >= this.time) {
      // Time to animation
      this.time = Date.now() + this.randomSpeed;

      const clientWidth = this.object.clientWidth;
      let left = "";
      if (this.div.style.left) {
        left = this.div.style.left;
        left = parseInt(left, 10);
      }

      // Если элемент достиг конца
      if (left > clientWidth) {
        return this.clearCloupPosition();
      }

      if (!left && left !== 0) {
        left = this.randomLeft;
        this.div.style.top = this.randomTop + "px";
        this.div.style.zIndex = this.randomZindex;
        this.divWidth = this.div.clientWidth;
      } else {
        left += 1;
      }

      if (force === true) {
        this.div.style.top = this.randomTop + "px";
        this.div.style.zIndex = this.randomZindex;
        this.divWidth = this.div.clientWidth;
        force = false;
      }

      this.div.style.left = left + "px";
    }
  }
}

const sky = new Sky();
sky.connectionAllClouds();
sky.start();
