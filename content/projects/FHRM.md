---
date: '2021-05-04'
title: 'Fetal Heart Rate Monitor Design Proposal'
github: 'https://github.com/awkyu/fhrm'
# external: 'https://brownlab.web.unc.edu/'
# slideshow: './Packtion Potential Poster_v2.pptx'
# slideshow1: './Kyu_Alex_AbramsPresentation.pdf'
document: './Kyu_Alex_Abstract.pdf'
company: 'North Carolina State University'
tech:
  - EAGLE CAD
  - PCB Design
showInProjects: false
---

This was a small project that involved controlling a servo-motor based on the amount of force placed on a sensor. This FSR (variable resistance), was placed into a wheatstone bridged, amplifed through an Instrumentation Amplfier and filtered through a Sallen-Key 4th-Ordered Butterworth Lowpass Filter at 20 Hz. This signal was then processed in an arduino, which drove the servo motor.
