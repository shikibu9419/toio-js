int prevVal = 1025;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(A3);
  if (val > 10 && val > prevVal)
    Serial.println(val);
  prevVal = val;
}
