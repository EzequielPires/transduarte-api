import { Controller, Get } from "@nestjs/common";

@Controller('')
export class AppController {
    @Get()
    index() {
        console.log('Bem vindo a api do sistema Transduarte.')
        return 'Bem vindo a api do sistema Transduarte.'
    }
}