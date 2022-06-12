export class CreateUserDto {
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
    readonly email: string;
    readonly dateOfBirth?: Date;
    readonly nationality?: string
    readonly address?: string
    readonly isActive?: boolean;
}
