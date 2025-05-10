import { Patient } from "src/patient/entity/patient.entity";
import { Physician } from "src/physician/entity/physician.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    reason: string;
    @Column({ type: 'timestamp', nullable: false })
    startDate: Date;
    @Column({ type: 'timestamp', nullable: false })
    endDate: Date;

    @ManyToOne(() => Patient, (patient) => patient.id, {cascade: true})
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Physician, (physician) => physician.id, {cascade: true})
    @JoinColumn({ name: 'physician_id' })
    physician: Physician;

}