/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/


let ave = 0
let sum = 0
let list: number[] = []
let EMG = 0
for (let index = 0; index <= 15; index++) {
    EMG = pins.analogReadPin(AnalogPin.P3)
    list.push(EMG)
}

let angle = 60
let max_angle = 160
let min_angle = 20
servos.P0.setAngle(angle)

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * Use dynamic average window to filter EMG signal from Pin P3
     */
    //% block="EMG_filtered"
    export function EmgFilter(): number {
        // Add code here
        EMG = pins.analogReadPin(AnalogPin.P3)
        list.unshift(EMG)
        list.removeAt(15)
        sum = 0
        for (let index = 0; index <= 15; index++) {
            sum = sum + list[index]
        }
        ave = sum / 15
        return ave
    }

    /**
     * Address motor rotation direction and speed by acceleration
     */
    //% block="set P0 servo rotates in the direction %direction by %speed (ms) interval"
    export function SetTurnSpeed(direction: number, speed: number): void {
        if (Math.abs(direction) >= 100) {
            if (direction <= 0) {
                angle = angle - 3
            } else {
                angle = angle + 3
            }
            if (angle <= min_angle) {
                angle = min_angle
            }
            if (angle >= max_angle) {
                angle = max_angle
            }
            servos.P0.setAngle(angle)
        }
        basic.pause(speed)
    }
}