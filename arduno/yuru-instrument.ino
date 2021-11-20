void setup() {
  Serial.begin(9600);        // シリアル通信の初期化
}

void loop() {
  int val = analogRead(A0);    // アナログピンを読み取る
  // Serial.print("val: ");
  if (val > 10)
    Serial.println(val);
  // delay(50);
}
