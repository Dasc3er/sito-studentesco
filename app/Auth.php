<?php

namespace App;

class Auth extends \App\Core\BaseContainer
{
    protected $user;
    protected $user_id;
    protected $is_admin;
    protected $email_verified;

    public function __construct($container)
    {
        parent::__construct($container);

        Models\Login::where('last_active', '<=', \Carbon\Carbon::now()->subSeconds($this->settings['app']['aliveTimeout']))->update(['session_code' => null]);

        // Controllo sulla sessione attiva
        if (!empty($_SESSION['random_key'])) {
            $this->find();
        }

        // Registratore delle visite
        if (!empty($this->settings['app']['functions']['visits'])) {
            if (!isset($_SESSION['counted'])) {
                $visit = new Models\Visit();

                $visit->browser = getenv('HTTP_USER_AGENT');
                $visit->address = getenv('REMOTE_ADDR');

                $visit->save();
            }

            $_SESSION['counted'] = 'ok';
        }
    }

    public function check()
    {
        return !empty($this->user);
    }

    public function attempt(string $email, string $password)
    {
        $result = Models\User::where(['email' => \Crypt::encode($email), 'state' => 1])->first();

        if (!empty($result) && password_verify($password, $result['password'])) {
            $login = new Models\Login();

            $login->user()->associate($result);
            $login->browser = getenv('HTTP_USER_AGENT');
            $login->address = getenv('REMOTE_ADDR');
            $login->last_active = \Carbon\Carbon::now();
            $login->session_code = \Utils::createKey();

            $login->save();

            $_SESSION['random_key'] = $login->session_code;

            $this->find();

            return true;
        }

        return false;
    }

    public function logout()
    {
        if ($this->check()) {
            Models\Login::where('user_id', $this->user())->update(['session_code' => null]);

            unset($this->user_id);
            unset($this->is_admin);
            unset($this->email_verified);
        }

        session_unset();
        session_destroy();
        session_start();
        session_regenerate_id();

        if (!empty($this->settings['app']['functions']['visits'])) {
            $_SESSION['counted'] = 'ok';
        }
    }

    private function find()
    {
        Models\Login::where('session_code', $_SESSION['random_key'])->update(['last_active' => \Carbon\Carbon::now()]);

        $user = Models\Login::where('session_code', $_SESSION['random_key'])->first();

        if (!empty($user)) {
            $user = $user->user;
            $this->user = $user;
            $this->is_admin = ($user->role == 1);
            $this->email_verified = empty($user->email_token);

            $identifier = md5($_SESSION['random_key'].$_SERVER['HTTP_USER_AGENT']);
            if (!empty($_SESSION['last_active']) && time() > $_SESSION['last_active'] + $this->settings['app']['aliveTimeout'] || !empty($_SESSION['identifier']) && $_SESSION['identifier'] != $identifier) {
                $this->logout();
            } else {
                $_SESSION['last_active'] = time();
                $_SESSION['identifier'] = $identifier;
            }

            if ($this->check() && !$this->emailVerificata()) {
                $this->flash->addMessage('warnings', '<i class="fa fa-bell"></i> '.$this->translator->translate('email.not-confirmed').' <a href="'.$this->router->pathFor('invia-verifica').'"> '.$this->translator->translate('email.send-again').'</a>');
            }
        } else {
            $this->logout();
        }
    }

    public function user()
    {
        return $this->user;
    }

    public function admin()
    {
        return $this->check() && !empty($this->is_admin);
    }

    public function emailVerificata()
    {
        return !empty($this->email_verified);
    }
}