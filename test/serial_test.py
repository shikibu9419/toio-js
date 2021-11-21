from serial import Serial
from time import sleep
import os
import csv

print(os.environ.get('SERIAL_PORT'))
ser = Serial(os.environ.get('SERIAL_PORT'))
ser.baudrate = 9600
ser.timeout  = 0.01

vals = []
try:
    while True:
        s = ser.readline().rstrip()
        if len(s) == 0:
            print('not')
            continue

        val = int(s)
        vals.append([val])
        print(val)
except KeyboardInterrupt:
    print('ok.')
    with open('out.csv', 'w') as f:
        csv.writer(f).writerows(vals)
