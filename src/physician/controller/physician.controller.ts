import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PhysicianService } from '../service/physician.service';
import { PhysicianDTO } from '../dto/physician.dto';

@Controller('physician')
export class PhysicianController {
    constructor(private physicianService: PhysicianService){
            
        }
    @Get()
    getAll(){
        return this.physicianService.getAll();
    }

    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.getById(id);
    }
    
    @Post()
    create(@Body() body: PhysicianDTO){
        return this.physicianService.create(body);
    }

    @Put()
    update(@Body() body: PhysicianDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.update(body, id);
    }
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.physicianService.delete(id);
    }
}
