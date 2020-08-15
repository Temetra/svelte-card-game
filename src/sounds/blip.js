// http://github.grumdrig.com/jsfxr/
// Console script for saved sound

PARAMS = Object.assign(PARAMS, {
  "oldParams": true,
  "wave_type": 3,
  "p_env_attack": 0,
  "p_env_sustain": 0.007073822778521421,
  "p_env_punch": 0,
  "p_env_decay": 0.11115102376366592,
  "p_base_freq": 0.278,
  "p_freq_limit": 0,
  "p_freq_ramp": -0.6621769057874458,
  "p_freq_dramp": 0,
  "p_vib_strength": 0,
  "p_vib_speed": 0,
  "p_arp_mod": 0,
  "p_arp_speed": 0,
  "p_duty": 0,
  "p_duty_ramp": 0,
  "p_repeat_speed": 0,
  "p_pha_offset": 0,
  "p_pha_ramp": 0,
  "p_lpf_freq": 1,
  "p_lpf_ramp": 0,
  "p_lpf_resonance": 0,
  "p_hpf_freq": 0.614,
  "p_hpf_ramp": 0,
  "sound_vol": 0.25,
  "sample_rate": 44100,
  "sample_size": 16
});

updateUi();
play();