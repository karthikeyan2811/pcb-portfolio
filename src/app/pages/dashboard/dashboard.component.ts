import { Component } from '@angular/core';
import { SkillChip } from '../../models/profile.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  name = 'GANANATHAN S';
  title = 'PCB Design Engineer';

  // Replace with the real headshot at src/assets/images/profile.jpg
  photoUrl = 'assets/1000418005.jpg';

  objective =
    'Seeking a position as a PCB Design Engineer where I can apply my skills in PCB layout and circuit simulation to contribute to high-quality hardware development, while continuing to grow professionally within a forward-thinking organization. ';

  stats = [
    { value: '20+', label: 'Boards taped out' },
    { value: '4', label: 'Years experience' },
    { value: '14L', label: 'Max layer count shipped' },
    { value: '99.2%', label: 'First-pass yield avg.' }
  ];

  skills: SkillChip[] = [
    { label: 'Altium Designer', level: 'core' },
    { label: "Pad's", level: 'core' },
    { label: 'KiCad', level: 'core' },
    { label: 'Signal Integrity', level: 'core' },
    { label: 'High-Speed Routing', level: 'core' },
    { label: 'Cadence Allegro', level: 'proficient' },
    { label: 'DFM / DFA', level: 'proficient' },
    { label: 'Power Integrity', level: 'proficient' },
    { label: 'EMI/EMC Compliance', level: 'proficient' },
    { label: 'Rigid-Flex Design', level: 'familiar' },
    { label: 'Thermal Analysis', level: 'familiar' }
  ];
}
