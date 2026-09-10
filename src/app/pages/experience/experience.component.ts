import { Component } from '@angular/core';
import { Academic, Project, WorkExperience, quickSummary } from '../../models/profile.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experience: WorkExperience[] = [
    {
      role: 'PCB Design Engineer',
      company: 'Cyint Private Limited (BOSCH)',
      location: 'Bengaluru, India',
      duration: 'Jan 2026 — Present',
      highlights: [
        'Own schematic capture through Gerber hand-off for 6–14 layer boards across 3 product lines.',
        'Led migration to Altium Designer 26.8, cutting layout turnaround time by 30%.',
        'Drove DFM reviews with contract manufacturers, lifting first-pass yield to 99.2%.',
        'Mentor 3 junior designers on stack-up planning and impedance-controlled routing.'
      ]
    },
    {
      role: 'PCB Design Engineer',
      company: 'Alphion Private Limited',
      location: 'Chennai, India',
      duration: 'Jul 2024 — Nov 2025',
      highlights: [
        'Designed sensor and power-management boards for industrial IoT gateways.',
        'ONT and OLT Designs simulations for DDR3/DDR4 interfaces using HyperLynx.',
        'Collaborated with mechanical team on rigid-flex enclosures for wearable devices.'
      ]
    },
    {
      role: 'PCB Layout Engineer',
      company: 'EMBDES Private Limited',
      location: 'Bangalore, India',
      duration: 'May 2022 — Jul 2024',
      highlights: [
        'Laid out 2–6 layer boards for consumer electronics prototypes.',
        'Built and maintained the component footprint and symbol library.'
      ]
    }
  ];

  academics: Academic[] = [
    {
      degree: 'B.Sc Electronics and Communuication Systems',
      institution: 'KG College of Arts and Science, Coimbatore',
      duration: '2019 — 2021',
      detail: 'Specialization Embedded Systems · CGPA 6.1/10'
    }
    
  ];

  projects: Project[] = [
    {
      name: '14-Layer High speed design',
      description: 'Can, Ethernet, USB, Impedance-controlled HDI board for an BGA fan-out and via-in-pad.',
      tools: ['Altium Designer']
    },
    {
      name: '8-Layer power board',
      description: '4-layer rigid-flex board packed into a 32mm wearable enclosure with analog front-end isolation.',
      tools: ['Altium Designer']
    },
    {
      name: 'Industrial IoT Gateway',
      description: '6-layer gateway board with isolated RS-485, PoE, and Wi-Fi/BLE co-existence layout.',
      tools: ['Cadence Allegro']
    }
  ];

  summary: quickSummary[] = [
    {
      points:' Interacting with Client on Understanding Requirements.'+
      '• Created Symbol and footprint libraries for schematic and PCB design tools as per IPC 7351 standards.'+ 
      '• Designed and implemented various system circuit boards with controlled impedance, Differential pair routing, length tuning and stack up design.'+ 
      '• Improving layout by Crosstalk and Noise reduction, layout recommendation given by datasheets. '+
      '• Identifying net swapping for GPIO pins for feasible routing and reviewing schematics with Application schematics given in data-sheet and discussion with Hardware engineer.'+ 
      '• Experience in communication protocols like UART, I2C, SPI, USB and PCIe.'+
      '• I have experience in Through Hole, Blind, Buried, Back drills and Micro via’s.'+
      '• Skilled in creating Libraries with Component parameters, Supplier Information, Footprints with 3D models.'+ 
      '• Supported DFM and DFA by optimizing PCB layout, ensuring design rule compliance, proper component placement, and generating accurate fabrication and assembly files.'+ 
      '• Interacted with Mechanical Team and involved in Mechanical evaluation.'+ 
      '• Setting DRC constraints.'+ 
      '• Fabrication layer instructions, Stackup details.'+ 
      '• Creation of Artwork files and other final deliverable.'+ 
      '• Viewing and checking Gerber files using Viewmate.'+ 
      '• Adapter testing with Load regulation, Line regulation efficiency test and etc., '
    }
  ]
}
