import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transaction_id: number

    @Column()
    domain: string

    @Column()
    status: string

    @Column()
    reference: string

    @Column()
    receipt_number: string

    @Column()
    amount: number

    @Column()
    message: string

    @Column()
    gateway_response: string

    @Column()
    paid_at: Date

    @Column()
    created_at: Date

    @Column()
    channel: string

    @Column()
    currency: string

    @Column()
    ip_address: string

    @Column()
    metadata: string

    @Column()
    customer_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Column()
    customer_code: string

    @Column()
    phone: string

    @Column()
    risk_action: string

    @Column()
    international_format_phone: string
}

/** TRANSACTION DETAILS
"id": 4099260516,
"domain": "test",
"status": "success",
"reference": "re4lyvq3s3",
"receipt_number": null,
"amount": 40333,
"message": null,
"gateway_response": "Successful",
"paid_at": "2024-08-22T09:15:02.000Z",
"created_at": "2024-08-22T09:14:24.000Z",
"channel": "card",
"currency": "NGN",
"ip_address": "197.210.54.33",
"metadata": "",
*/

/**CUSTOMER DETAILS
"id": 181873746,
"first_name": null,
"last_name": null,
"email": "demo@test.com",
"customer_code": "CUS_1rkzaqsv4rrhqo6",
"phone": null,
"metadata": null,
"risk_action": "default",
"international_format_phone": null
*/