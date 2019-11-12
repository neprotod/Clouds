var clouds = {
  //Свойства

  // диапазон скорости
  speed1: 30,
  speed2: 80,

  // Для расчета случайного числа
  getRandom: function(min_random, max_random) {
    var range = max_random - min_random + 1;
    return Math.floor(Math.random() * range) + min_random;
  },

  init: function(div, left1, left2, top1, top2) {
    var objName = div.id;
    //Начальные данные
    var randomLeft = this.getRandom(left1, left2);
    var randomZindex = this.getRandom(2, 11);
    //Значение ширины элемента
    var divWidth;

    var randomSpeed = this.getRandom(this.speed1, this.speed2);

    var randomTop = this.getRandom(top1, top2);

    var object = this;

    this[objName] = {
      time: "",
      init: 1,

      randomLeft: randomLeft,
      randomZindex: randomZindex,
      divWidth: divWidth,
      randomSpeed: randomSpeed,
      randomTop: randomTop,

      object: object,

      div: div,
      // характиристики
      top1: top1,
      top2: top2,

      clearLeft: function() {
        clearTimeout(this.time);
        this.div.style.left = -this.divWidth + "px";
        this.randomTop = this.object.getRandom(this.top1, this.top2);
        this.randomSpeed = this.object.getRandom(
          this.object.speed1,
          this.object.speed2
        );
        this.randomZindex = this.object.getRandom(2, 11);
        this.goClouds(1);
      },

      goClouds: function(a) {
        var obj = this;

        var body = document.body.clientWidth;
        var left = this.div.style.left;
        left = parseInt(left, 10);

        // Если элемент достиг конца
        if (left > body) {
          return this.clearLeft();
        }

        /***********/
        if (!left && left !== 0) {
          left = this.randomLeft;
          this.div.style.top = this.randomTop + "px";
          this.div.style.zIndex = this.randomZindex;
          this.divWidth = this.div.clientWidth;
        } else {
          left += 1;
        }

        if (a === 1) {
          this.div.style.top = this.randomTop + "px";
          this.div.style.zIndex = this.randomZindex;
          this.divWidth = this.div.clientWidth;
        }

        this.div.style.left = left + "px";

        obj.time = setTimeout(function() {
          obj.goClouds();
        }, obj.randomSpeed);
      }
    };

    this[objName].goClouds();
  }
};

//***********//

//**********//
//Наименование облаков
var claud1 = document.getElementById("clouds1");
var claud2 = document.getElementById("clouds2");
var claud3 = document.getElementById("clouds3");
var claud4 = document.getElementById("clouds4");
var claud5 = document.getElementById("clouds5");
var claud6 = document.getElementById("clouds6");
var claud7 = document.getElementById("clouds7");
var claud8 = document.getElementById("clouds8");
var claud9 = document.getElementById("clouds9");

// Запуск функции облаков
clouds.init(claud1, 1, 300, -50, 300);
clouds.init(claud2, 410, 800, -50, 300);
clouds.init(claud3, 950, 1500, -50, 300);

clouds.init(claud4, 100, 1500, -50, 300);
clouds.init(claud5, 50, 300, -50, 300);
clouds.init(claud6, 450, 800, -50, 300);

clouds.init(claud7, 400, 800, -50, 300);
clouds.init(claud8, 900, 1500, -50, 300);
clouds.init(claud9, 100, 300, -50, 300);
