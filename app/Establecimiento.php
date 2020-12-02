<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    protected $fillable = [
        'nombre',
        'categoria_id',
        'imagen_principal',
        'direccion',
        'colonia',
        'lat',
        'lng',
        'telefono',
        'descripcion',
        'apertura',
        'cierre',
        'uuid',
        'user_id'
    ];

    //relacion n:1 muchos establecimientos pertenecen a una categoria
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

}
