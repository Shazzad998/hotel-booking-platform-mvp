<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'name'          => [
                'required',
                'string',
                'max:255',
                Rule::unique('room_types', 'name')->ignore($this->route('room_type')),
            ],
            'description'   => ['nullable', 'string'],
            'no_of_bedrooms'=> ['required', 'integer', 'min:1'],
            'max_guests'    => ['required', 'integer', 'min:1'],
            'facilities'    => ['nullable', 'array'],
            'facilities.*'  => ['string', 'max:255'],
        ];
    }
}
