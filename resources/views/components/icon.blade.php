@props(['name', 'size' => 22])
<svg width="{{ $size }}" height="{{ $size }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" {{ $attributes }}>
@switch($name)
@case('home')<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>@break
@case('pin')<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>@break
@case('search')<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>@break
@case('arrow')<path d="M4 12h16m-6-6 6 6-6 6"/>@break
@case('bed')<path d="M3 18v-8h18v8M3 15h18M5 10V6h14v4M3 18v3m18-3v3M8 6v4m8-4v4"/>@break
@case('area')<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 16 8-8m-8 0h8v8"/>@break
@case('phone')<path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z"/>@break
@case('whatsapp')<path d="M20 11.5a8.5 8.5 0 0 1-12.5 7.4L3 20l1.2-4.4A8.5 8.5 0 1 1 20 11.5Z"/><path d="m8.4 7.5 1.3 2.3-1 1.2a7 7 0 0 0 3.5 3.5l1.2-1 2.3 1.3c-.2 1.5-1.2 2-2.5 1.6a10 10 0 0 1-6-6c-.4-1.3.1-2.3 1.2-2.9Z"/>@break
@case('chevron-left')<path d="m14 6-6 6 6 6"/>@break
@case('chevron-right')<path d="m10 6 6 6-6 6"/>@break
@case('chat')<path d="M20 11a8 8 0 0 1-12 7l-5 2 1-5a8 8 0 1 1 16-4Z"/><path d="M8 10h8m-8 4h5"/>@break
@case('calendar')<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4m8-4v4"/>@break
@case('check')<path d="m5 12 4 4 10-10"/>@break
@endswitch
</svg>
