// Variables for controlling the timing of dealing cards
export const avgDealDelay = 400;
export const dealDelayDeviation = 25;
export const audioDelay = 0;
export const delayFrom = avgDealDelay - dealDelayDeviation - audioDelay;
export const delayTo = avgDealDelay + dealDelayDeviation - audioDelay;
export const delayFinal = avgDealDelay + dealDelayDeviation;