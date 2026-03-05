import * as userRepository from '../repositories/userRepository.js';
import {UserDto} from "../dtos/userDto.js";
import {toUserDto} from "../mappers/userMapper.js";

export function getUserById(id: string): UserDto | null {
    const userModel = userRepository.getUserById(id)
    if (!userModel) return null;

    return toUserDto(userModel);
}