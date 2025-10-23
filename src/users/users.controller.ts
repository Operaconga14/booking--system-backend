import { Controller, Get, Body, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('user')
    @Get('details')
    getDetails(@Req() req: any) {
        return this.usersService.getUserDetails(req);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('user')
    @Patch('update')
    update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUserdetails(req, updateUserDto);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('user')
    @Delete('delete-account')
    remove(@Req() req: any) {
        return this.usersService.removeUserAccount(req);
    }
}
