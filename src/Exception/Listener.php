<?php

declare(strict_types=1);

namespace App\Exception;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function strpos;

final class Listener
{
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        if (! ($exception instanceof HttpException) || strpos($event->getRequest()->getRequestUri(), '/api/') === false) {
            return;
        }

        $response = new JsonResponse(['error' => $exception->getMessage()]);
        $response->setStatusCode($exception->getStatusCode());
        $event->setResponse($response);
    }
}