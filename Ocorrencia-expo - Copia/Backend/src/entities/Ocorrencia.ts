import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("ocorrencias")
export class Ocorrencia {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    descricao!: string;

    @Column()
    local!: string;

    @Column()
    status!: string;

    @Column({ nullable: true })
    idade!: number;

    @Column({ nullable: true })
    sexo!: string;

    @Column({ nullable: true })
    produto!: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    preco!: number;

    @Column({ nullable: true })
    setor!: string;

    @Column({ nullable: true })
    observacao!: string;

    @Column()
    imagem!: string;

    @CreateDateColumn()
    created_at!: Date;
    
    @Column({ default: true })
    ativo!: boolean;

}

