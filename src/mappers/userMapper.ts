import type {User} from "../models/user.js";
import type {UserDto} from "../dtos/userDto.js";

export function toUserDto(user: User): UserDto {
    return {
        id: user.id,
        email: user.email,
    }
}
