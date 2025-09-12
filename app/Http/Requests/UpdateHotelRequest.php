<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHotelRequest extends FormRequest
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
            'name'        => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('hotels', 'slug')->ignore($this->route('hotel')),
            ],
            'address'     => 'required|string|max:255',
            'city'        => 'required|string|max:255',
            'country'     => 'required|string|max:255',
            'description' => 'nullable|string',
            'star_rating' => 'required|integer|min:1|max:5',
            'status'      => 'required|in:active,inactive',
            'images.*'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'string'
        ];
    }
}
