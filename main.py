"""

Use this file to define custom functions and blocks.
Read more at https://makecode.microbit.org/blocks/custom

"""
ave = 0
sum2 = 0
list2: List[number] = []
EMG = 0
for index in range(16):
    EMG = pins.analog_read_pin(AnalogPin.P3)
    list.append(EMG)
angle = 60
max_angle = 160
min_angle = 20
servos.P0.set_angle(angle)
"""

Custom blocks

"""
# % weight=100 color=#0fbc11 icon=""
@namespace
class custom:
    """
    
    Use dynamic average window to filter EMG signal from Pin P3
    
    """
    # % block="EMG_filtered"
    def EmgFilter():
        global EMG, sum, ave
        # Add code here
        EMG = pins.analog_read_pin(AnalogPin.P3)
        list.unshift(EMG)
        list.remove_at(15)
        sum = 0
        for index2 in range(16):
            sum = sum + list[index2]
        ave = sum / 15
        return ave
    """
    
    Address motor rotation direction and speed by acceleration
    
    """
    # % block="set P0 servo rotates in the direction %direction by %speed (ms) interval"
    def SetTurnSpeed(direction: number, speed: number):
        global angle
        if abs(direction) >= 100:
            if direction <= 0:
                angle = angle - 3
            else:
                angle = angle + 3
            if angle <= min_angle:
                angle = min_angle
            if angle >= max_angle:
                angle = max_angle
            servos.P0.set_angle(angle)
        basic.pause(speed)