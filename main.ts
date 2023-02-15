
namespace custom2 {
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
 
}