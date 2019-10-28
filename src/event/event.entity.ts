import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { type } from "os";

export enum EventStatus {
    NEW = "New",
    APPROVED = "Approved",
    DECLINED = "Declined"
}

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    timeArrival: string;

    @Column()
    timeDeparture: string;

    @Column()
    companyName: string;

    @Column()
    positionCompany: string;

    @Column()
    role: string;

    @Column()
    sex: string;

    @Column()
    birthdate: string;

    @Column()
    country: string;

    @Column({
        enum: EventStatus,
        default: EventStatus.NEW
    })
    status: string;
}