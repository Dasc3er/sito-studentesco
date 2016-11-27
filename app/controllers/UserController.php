<?php

namespace App\Controllers;

class UserController extends \App\Core\BaseContainer
{
    public function credentials($request, $response, $args)
    {
        $args = array_merge($args, $this->auth->user()->toArray());

        $response = $this->view->render($response, 'auth/credentials.twig', $args);

        return $response;
    }

    public function credentialsPost($request, $response, $args)
    {
        if (!$this->validator->hasErrors()) {
            $name = $this->filter->name;
            $username = $this->filter->username;
            $email = $this->filter->email;
            $password = $this->filter->password;
            $rep_password = $this->filter->rep_password;

            $userFree = \Utils::isUsernameFree($username);
            $emailFree = \Utils::isEmailFree($email);

            if ($userFree && $emailFree && $password == $rep_password) {
                $user = $this->auth->user();

                $user->name = $name;
                $user->username = $username;
                $user->email = $email;
                $user->password = $password;
                $user->email_token = \Utils::createKey();

                $user->save();

                \Utils::sendEmail($email, 'verification', [':path' => 'http://'.$request->getUri()->getHost().''.$this->router->pathFor('verifica-email', ['code' => $user->email_token])]);

                $this->flash->addMessage('infos', $this->translator->translate('register.success'));
                $this->router->redirectTo();

                session_regenerate_id();
            } else {
                if ($password != $rep_password) {
                    $this->flash->addMessage('errors', $this->translator->translate('base.errorPassword'));
                }
                if ($userFree) {
                    $this->flash->addMessage('errors', $this->translator->translate('base.errorEmail'));
                }
                if ($emailFree) {
                    $this->flash->addMessage('errors', $this->translator->translate('base.errorUsername'));
                }

                $this->router->redirectTo('credentials');
            }
        }

        return $response;
    }

    public function verifyEmail($request, $response, $args)
    {
        $this->database->delete('keys', array('AND' => array('value' => $args['code'], 'name' => 'email_code')));
        $this->router->redirectTo();

        return $response;
    }

    public function sendVerify($request, $response, $args)
    {
        $user = $this->auth->user();

        $user->email_token = \Utils::createKey();
        $user->save();

        \Utils::sendEmail($user->email, 'verification', [':path' => 'http://'.$request->getUri()->getHost().''.$this->router->pathFor('verifica-email', ['code' => $user->email_token])]);

        $this->router->redirectTo();

        return $response;
    }

    public function profile($request, $response, $args)
    {
        $response = $this->view->render($response, 'profile.twig', $args);

        return $response;
    }
}
