---
title: How to Easily Create Strong Passwords
date: 2014-11-29T17:08:40+00:00
excerpt: "Strong passwords are important because your personal data is important. I'm going to show that everybody can have strong passwords easily without forgetting them."
layout: post
permalink: /easily-create-strong-passwords
categories:
  - Web
tags:
  - Security
---
Strong passwords are important because your personal data is important. I’m going to show that everybody can have safe passwords easily without forgetting them.

## Password Basics

You shouldn’t use the same [password](https://en.wikipedia.org/wiki/Password "Wikpedia: Password") for different accounts, even if the password is sufficiently strong. If one account gets hacked and somebody gets ahold of your password, all your other accounts are wide open.

If this happens you’re in for a lot of work because you have to change the password for all these accounts. It’s better to invest just a little more in the beginning.

## What Are Passwords Made Of?

Strong passwords are long and don’t consist of any personal information or are made from common words you can find in a dictionary. Also they mustn’t consist of well-known information like a quote or lyrics.

The reason for this is a hacker can just grab a dictionary and try all those words one after the other. This is called a brute-force attack.

## Don’t Try to Be Smart

If you use a password like _password_ and change it to _p@ssw0rd_ to include numbers and special characters, which is still readable and therefore convenient, then you just got hacked. Hackers also know about these tactics and try all those combinations. It’s very unlikely that you are able to outsmart professional hackers.

A more detailed explanation of [weak passwords is on Wikipedia](https://en.wikipedia.org/wiki/Password_strength#Guidelines_for_strong_passwords "Wikipedia: Guidelines for Strong Passwords").

## Passphrases and not Passwords

It’s better to use a [passphrase](https://en.wikipedia.org/wiki/Passphrase "Wikipedia: Passphrase"). _strongpassphrasesaregood_ is better than _strongpassword_. But the same which applies to passwords also applies to passphrases: no personal information and no common words.

## How Long Should a Password or Passphrase Be?

Having at least 10 characters is crucial. 15 to 20 characters is much better if you want to stay future proof. Passphrase tend to be even longer.

What is secure now won’t be secure in 5 or 10 years. If somebody saved your undecryptable data now they will be able to decrypt it after those years.

While you don’t know what happens to your data in the future I guess you very much don’t like to see your personal data being widely available to everybody as long as you live. So better make sure your passphrase stays safe for a very long time.

## How to Memorize Strong Passphrases

You don’t. It’s not feasible to remember a sufficiently strong passphrase which tends to be very long. There are exceptions (Diceware, see below) but the best idea is to use long and completely random passphrases and store those in a password manager.

## Password Managers

Password managers are safe storage applications which specialize in passwords and other secrets. Generally they don’t store large documents but only small amounts of information.

Popular password managers are [1Password](https://1password.com/ "Password Manager for Mac, iOS, Windows and Android"), [KeePassX](https://www.keepassx.org/ "Open-source Cross Platform Password Manager") or [LastPass](https://lastpass.com/ "Online Password Storage"). There are a lot more lesser known. I recommend local applications over web services like LastPass, which store your passphrases on their servers where you have less control and needs a lot of trust.

To save a password you create a login item having your username, passphrase and the URL of the website if it’s a website. Using your manager you can log in by automatically filling in your username and password and initiating the login. Depending on the manager this works on desktop and mobile, because the passphrases are synced between your devices.

Password managers do also generate strong passphrases for you and store them automatically as login items.

I use 1Password on my Mac, iPhone and iPad and I’m very satisfied with the experience. It’s the first app I install on all those devices.

## Generate In Bulk If You Are a Techie

If you are a techie and have access to a computer running Unix like Linux or macOS you can generate your password after installing a terminal application like pwgen.

This generates 10 random passwords with the length of 20, the output is one password per line:

<pre>pwgen -cnys1 -N 10 20</pre>

## Don’t Use Password Generating Websites

Don’t use a website to generate the passwords for you for free. You want secure passwords and don’t know if the people running the server either store the generated passwords for hacking attacks or if somebody is intercepting the generated passwords because the connection to the server is not secure.

## Use Diceware If You Are Human

Of course techies are also human but this is a very non-technical approach. I like it very much. [Diceware](https://en.wikipedia.org/wiki/Diceware "Wikipedia: Diceware") means rolling five dice six times and picking the correspondent six words from a list. The passphrase will consist of these six words separated by spaces. There are lists for [English](http://world.std.com/~reinhold/diceware.wordlist.asc) and other languages.

Passphrases created with dice are safe because even though the word lists are known the choosing of the words from these lists are completely random. A random passphrase of the same length would have more strength but the whole point of diceware is having safe and memorable passphrases.

## Conclusion

Passphrases made from dice can be remembered quite easily. You should use these for those passphrase which you cannot store in a safe password manager. Like the passphrase for manager itself.

For everything else you should use a password manager and use one distinct random passphrase for every account and store it in your manager exclusively.