import { LightningElement } from 'lwc';

export default class Wizard extends LightningElement {
    stages = [
        {
            id: "venue",
            label: "Venue",
            icon: "utility:checkin",
            active: false,
            completed: true
        },
        {
            id: "expertise",
            label: "Expertise (Area)",
            icon: "utility:quote",
            active: false,
            completed: true
        },
        {
            id: "doctor",
            label: "Doctor",
            icon: "utility:user",
            active: true,
            completed: false
        },
        {
            id: "summary",
            label: "Summary",
            icon: "utility:summary",
            active: false,
            completed: false
        },
    ];

    handleNavSelected = (event) => {
        const selectedStage = event.detail.selectedStage;
        
        if (!selectedStage) {
            return;
        }

        this.stages = this.stages.map(stage => {
            if (stage.id === selectedStage.id) {
                return selectedStage;
            }

            return {...stage, active: false };
        })
    }
}