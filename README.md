## Code JomatBC | Admin-version

Version de angular: [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

<h2> Development server </h2>

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

<h2> Build </h2>

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Observaciones
1.-En la ruta `src\environments` modificar la variable `endpoint` en los 2 archivos environments*.ts a la URL donde se hostee el API. <br>
2.-En la ruta `src\app\componentes\list-users\list-users.component.ts` en la funcion `SHARE` modificar localhost al URL donde se hostee. <br>
3.-En la ruta `src\app\services\user.service.ts` se modifica el path del API para acceder a todos los datos el cual es `api/usuarios/` <br>
4.-La funcion del PWA se activa unicamente en moviles con dimensiones menores a 700px

