import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PhysicianService } from '../service/physician.service';
import { PhysicianDTO } from '../dto/physician.dto';
import { Auth } from 'src/auth/service/auth.decorator';
import { Role } from 'src/common/role';

@Controller('physician')
export class PhysicianController {
    
    constructor(private physicianService: PhysicianService){}        
    
    @Auth()
    @Get()
    getAll(){
        return this.physicianService.getAll();
    }

    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.getById(id);
    }
    
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: PhysicianDTO){
        return this.physicianService.create(body);
    }
    
    @Auth()
    @Put()
    update(@Body() body: PhysicianDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.update(body, id);
    }

    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.physicianService.delete(id);
    }
}
