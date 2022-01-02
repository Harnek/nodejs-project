<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Room\RoomCategoryController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Contact\ContactController;
use App\Http\Controllers\Review\ReviewController;
use App\Http\Controllers\Invoice\InvoiceController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminBookingController;
use App\Http\Controllers\Admin\AdminRoomController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminSearchController;
use App\Http\Controllers\Admin\AdminSettingController;

use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'index')->name('home');
Route::get('/rooms', [RoomCategoryController::class, 'index'])->name('rooms');
// Route::view('/area', 'area')->name('area');
Route::view('/gallery', 'gallery')->name('gallery');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'contact'])->name('contact.store');
Route::post('/review', [ReviewController::class, 'store'])->name('review');

Route::get('/order', [OrderController::class, 'index'])->name('order');
Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show');

Route::post('/booking', [BookingController::class, 'search'])->name('booking.search');
Route::get('/booking/confirm', [BookingController::class, 'confirm'])->name('booking.confirm');
Route::post('/booking/redirectPay', [BookingController::class, 'redirectPay'])->name('booking.redirectPay');
#keep this route below all bookings routes or else it will overwrite other routes
Route::get('/booking/{slug}', [BookingController::class, 'index'])->name('booking');

Route::get('/payment', [PaymentController::class, 'index'])->name('payment');
Route::post('/payment/pay', [PaymentController::class, 'pay'])->name('payment.pay');
Route::post('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');
// Route::post('/payment/status', [PaymentController::class, 'status'])->name('payment.status');

// Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice');
Route::get('/invoice/{id}', [InvoiceController::class, 'show'])->name('invoice.show');


Route::prefix('admin')->name('admin.')->group(function () {
    Auth::routes(['register' => false, 'verify' => false]);

    // Route::middleware('auth')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

        Route::get('/search', [AdminSearchController::class, 'search'])->name('search');

        // Route::get('/customers', [AdminCustomerController::class, 'index'])->name('customers');
        // Route::get('/customers/{id}', [AdminCustomerController::class, 'show'])->name('customers.show');

        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders');
        Route::get('/orders/create', [AdminOrderController::class, 'create'])->name('orders.create');
        Route::post('/orders', [AdminOrderController::class, 'store'])->name('orders.store');
        Route::get('/orders/{id}/cancel', [AdminOrderController::class, 'cancel'])->name('orders.cancel');
        Route::get('/orders/{id}/updatepayment', [AdminOrderController::class, 'updatePayment'])->name('orders.updatepayment');
        Route::get('/orders/{id}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::get('/orders/{id}/invoice', [AdminOrderController::class, 'invoice'])->name('orders.invoice');
        Route::get('/orders/{id}/edit', [AdminOrderController::class, 'edit'])->name('orders.edit');
        Route::put('/orders/{id}', [AdminOrderController::class, 'update'])->name('orders.update');

        Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings');
        Route::get('/bookings/{id}', [AdminBookingController::class, 'show'])->name('bookings.show');
        
        Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories');
        Route::get('/categories/create', [AdminCategoryController::class, 'create'])->name('categories.create');
        Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
        Route::get('/categories/{id}', [AdminCategoryController::class, 'show'])->name('categories.show');
        Route::get('/categories/{id}/edit', [AdminCategoryController::class, 'edit'])->name('categories.edit');
        Route::put('/categories/{id}', [AdminCategoryController::class, 'update'])->name('categories.update');
        
        Route::get('/rooms', [AdminRoomController::class, 'index'])->name('rooms');
        Route::get('/rooms/create', [AdminRoomController::class, 'create'])->name('rooms.create');
        Route::post('/rooms', [AdminRoomController::class, 'store'])->name('rooms.store');
        Route::get('/rooms/{id}', [AdminRoomController::class, 'show'])->name('rooms.show');
        Route::get('/rooms/{id}/edit', [AdminRoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/rooms/{id}', [AdminRoomController::class, 'update'])->name('rooms.update');
        
        Route::get('/reviews', [AdminReviewController::class, 'index'])->name('reviews');
        Route::get('/reviews/{id}', [AdminReviewController::class, 'show'])->name('reviews.show');
        Route::get('/reviews/{id}/toggle', [AdminReviewController::class, 'toggle'])->name('reviews.toggle');
        Route::delete('/reviews/{id}', [AdminReviewController::class, 'destroy'])->name('reviews.destroy');

        Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings');
        Route::get('/settings/edit', [AdminSettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
    // });
});
