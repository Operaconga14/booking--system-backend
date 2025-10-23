import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { InviteAdminDto } from './dto/invite-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Post('invite')
    inviteNewAdmin(@Req() req: any, @Body() inviteAdminDto: InviteAdminDto) {
        return this.adminService.inviteNewAdmin(req, inviteAdminDto);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Post('add')
    add(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.addAdmin(createAdminDto);
    }

    @Post('self-register')
    selfRegister(@Body() creteAdminDto: CreateAdminDto) {
        return this.adminService.selfRegistration(creteAdminDto);
    }

    @Post('login')
    login(@Body() loginAdminDto: LoginAdminDto) {
        return this.adminService.loginAdmin(loginAdminDto);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Get('all-admins')
    getAllAdmin() {
        return this.adminService.findAll();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Delete('delete-account')
    remove(@Req() req: any) {
        return this.adminService.remove(req);
    }
}
