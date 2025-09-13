<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomRequest extends FormRequest
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
            'hotel_id'        => 'required|exists:hotels,id',
            'room_type_id'    => 'required|exists:room_types,id',
            'room_number'     => [
                'required',
                'string',
                'max:255',
                Rule::unique('rooms', 'room_number')->ignore($this->route('room')),
            ],
            'price_per_night' => 'required|numeric|min:0',
            'images'          => 'nullable|array',
            'status'          => 'required|in:available,booked,under_maintenance',
            'images.*'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'string'
        ];
    }
}
