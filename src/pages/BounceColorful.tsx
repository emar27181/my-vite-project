import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Vector, Color } from 'p5';

const DEBUG = true, FPS = 20, NUM_MOVERS = 8, WINDOW_SIZE = 100;
const WINDOW_WIDTH = WINDOW_SIZE, WINDOW_HEIGHT = WINDOW_SIZE;
const MIN_RADIUS = WINDOW_SIZE / 200, MAX_RADIUS = WINDOW_SIZE / 200;
const ALPHA = 15;

// データの取得と解析
/*
const response = await fetch('/data/colorData.json');
const data = await response.json();


// 確認用出力
console.log("data: " + data);
*/

export function BounceColorful() {
  const sketch = (p: P5CanvasInstance) => {
    //let movers = []; // Moverオブジェクトを格納する配列
    let movers: Mover[] = [];
    let ColorOfEmotionArray: ColorOfEmotion[] = [];
    let actualNumMovers = -1;
    let angle = 0; // 円運動の角度
    let radius = 0; // 円運動の半径
    let speed = 1; // 円運動のスピード

    p.setup = () => {

      if (DEBUG) { p.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT); }
      else { p.createCanvas(p.windowWidth, p.windowHeight); }
      //p.createCanvas(p.windowWidth, p.windowHeight);
      if (DEBUG) { p.frameRate(FPS); }
      p.colorMode(p.HSB, 360, 100, 100, 100);

      //感情の色のインスタンスの生成
      for (let i = 0; i < 8; i++) {
        //ColorOfEmotionArray[i] = new ColorOfEmotion(300, 5); //仮実装として(Hue, Intense) = (50, 5)として生成
        ColorOfEmotionArray[i] = new ColorOfEmotion((360 / 8) * i, 5); //本来はバックエンドから受け取ったデータ(json形式？)を代入
      }
      getDrawMoverNum(); //それぞれの色における生成する円の数の計算

      //動く円のインスタンスの生成
      let countMovers = 0; //count: 動く円のインデックス番号
      for (let i = 0; i < 8; i++) { // i: 感情の色のインデックス番号
        for (let j = 0; j < ColorOfEmotionArray[i].drawMoverNum; j++) { // j: ある感情の色([i])における円のインデックス番号
          movers[countMovers++] = new Mover(p.random(p.width), p.random(p.height), ColorOfEmotionArray[i].hue);
        }
      }
    }
    p.draw = () => {
      p.background(0, 0, 0, ALPHA);
      angle += speed; // 円運動の角度を更新
      let x = p.width / 2 + p.cos(angle) * radius; // 中心座標の計算
      let y = p.height / 2 + p.sin(angle) * radius;
      for (let i = 0; i < actualNumMovers; i++) {
        let m = movers[i];
        let d = p.dist(m.position.x, m.position.y, x, y); // 中心座標との距離を計算
        let speed = p.map(d, 0, radius, 10, 0); // 距離に応じて速度を変化させる
        let angle = p.atan2(y - m.position.y, x - m.position.x); // 中心座標との角度を計算
        m.applyForce(p.createVector(p.cos(angle), p.sin(angle)).mult(speed)); // 力を加える
        m.update(); // 位置を更新する
        m.display(); // 描画する
      }
    }

    class Mover {
      position: Vector;
      velocity: Vector;
      acceleration: Vector;
      mass: number;
      color: Color;

      constructor(x: number, y: number, hue: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.mass = p.random(MIN_RADIUS, MAX_RADIUS);
        this.color = p.color(hue, 80, 100, 255);
      }

      applyForce(force: Vector) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display() {
        p.fill(this.color);
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.mass * 10, this.mass * 10);
      }
    }

    class ColorOfEmotion {
      hue: number;
      intense: number;
      drawMoverNum: number = -1;

      constructor(hue: number, intense: number) {
        this.hue = hue;
        this.intense = intense;
        //this.drawMoverNum = getDrawMoverNum(); //多分このコードは要らない
      }
    }

    //8大感情の色のそれぞれに対する描画数を計算する関数
    function getDrawMoverNum() {
      let sumIntense = 0;
      //8感情の強さの合計の計算
      for (let i = 0; i < 8; i++) {
        sumIntense += ColorOfEmotionArray[i].intense;
      }
      // 各感情において描画数の計算
      for (let i = 0; i < 8; i++) {
        ColorOfEmotionArray[i].drawMoverNum = Math.floor(NUM_MOVERS * ColorOfEmotionArray[i].intense / sumIntense);
        actualNumMovers += ColorOfEmotionArray[i].drawMoverNum;
        if (DEBUG) {
          console.log("ColorOfEmotionArray[" + i + "].drawMoverNum: " + ColorOfEmotionArray[i].drawMoverNum);
          console.log("actualNumMovers: " + actualNumMovers);
        }
      }

    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BounceColorful