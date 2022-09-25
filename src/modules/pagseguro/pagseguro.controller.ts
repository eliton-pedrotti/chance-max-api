import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PagseguroService } from './pagseguro.service';

@Controller('pagseguro')
export class PagseguroController {
    constructor(private readonly pagseguroService: PagseguroService) { }

    //MATAR ESSA CONTROLLER DEPOIS
    @Get('/create-subsequent-payment')
    getDataAPISportMonks() {
        return this.pagseguroService.createSubsequentPayment();
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/cancel-plan/:userId')
    cancelPlan(
        @Param('userId') userId: number
    ) {
        return this.pagseguroService.cancelPlan(userId);
    }

    @Post('/reactive')
    public reactivePlan(@Body() req: User): any {
        try {
            return this.pagseguroService.reactivePlan(req);
        } catch (error) {
            return error;
        }
    }
}
