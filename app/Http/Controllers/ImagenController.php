<?php

namespace App\Http\Controllers;

use App\Establecimiento;
use App\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class ImagenController extends Controller
{
    //
    public function store(Request $request){

        $ruta_imagen = $request->file('file')->store('establecimientos', 'public');

        //resize a la imagen
        $imagen = Image::make( public_path("storage/{$ruta_imagen}"))->fit(800,450);
        $imagen->save();

        //almacenar en BD con modelo
        $imagenDB = new Imagen;
        $imagenDB->id_establecimiento = $request['uuid'];
        $imagenDB->ruta_imagen = $ruta_imagen;

        $imagenDB->save();

        //retornar respuesta
        $respuesta = [
            'archivo' =>$ruta_imagen
        ];

        return response()->json($respuesta);
    }

    //elimina una imagen de la BD y del servidor
    public function destroy(Request $request){

        //validacion
        $uuid = $request->get('uuid');
        $establecimiento = Establecimiento::where('uuid', $uuid)->first();
        $this->authorize('delete', $establecimiento);

        //imgen a eliminar
        $imagen = $request->get('imagen');

        if (File::exists('storage/' . $imagen)) {
            //elimina imagen del servidor
            File::delete('storage/' . $imagen);

            //elimina imagen de ls BD
            Imagen::where('ruta_imagen', '=', $imagen)->delete();

            $respuesta = [
                'mensaje' => 'Imagen eliminada',
                'imagen' => $imagen
            ];

        }

        return response()->json($respuesta);
    }

}
