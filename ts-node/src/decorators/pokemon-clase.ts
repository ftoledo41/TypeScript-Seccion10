function printToConsole(constructor: Function) {
  console.log(constructor);
}

const printConsoleConditional = (print?: boolean): Function => {
  // return () => console.log("Hola Mundo");
  if (print) {
    return printToConsole;
  } else
    return () => {
      console.log("Hola");
    };
};

const bloquearPrototipe = function (constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

function CheckValidPokemonId() {
  return function (target:any, propertyKey:string, descriptior:PropertyDescriptor) {
    // console.log({target, propertyKey, descriptior})
    const originalMethod = descriptior.value;
    descriptior.value = (id: number) => {
      if (id < 1 || id > 80) {
        return console.error("El id del pokemno debe estar entre 1 y 800")
      }
      else
      {
        return originalMethod(id);
        }
    }
  }
}

function readonly(isWritable: boolean = true): Function {
  return function (target:any, propertyKey:string) {
    const descriptor: PropertyDescriptor = {
      get() {
        console.log(this)
        return "Francisco";
      },
      set(this, val) {
        // console.log(this, val)
        Object.defineProperty(this, propertyKey, {
          value: val,
          writable: !isWritable,
          enumerable: false
        })
      }
    }
    return descriptor;
  }

 
}

@bloquearPrototipe
@printConsoleConditional(false)
export class Pokemon {
  @readonly(true)
  public publicApi: string = "https://pokeapi.co/";

  constructor(public name: string) {}

  @CheckValidPokemonId()
  savePokemonsToDB(id: number) {
    console.log(`Pokemon guardado en base de datos ${id}`);
  }
}
