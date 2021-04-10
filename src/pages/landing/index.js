import React from 'react'
import assets from 'assets'
import Helmet from 'react-helmet'
import { WrapperLanding } from './style'

class LandingPage extends React.Component {
  render() {
    return (
      <WrapperLanding>
        <Helmet>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Jalan Ninja Dashboard</title>
          <meta name="description" content="Jalan Ninja Dashboard" />
          <link rel="icon" type="image/png" href="landing/assets/img/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,700,700i,900"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="landing/assets/vendors/bootstrap/dist/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="landing/assets/css/main.min.css" />
          <script src="landing/assets/vendors/jquery/dist/jquery.min.js"></script>
          <script src="landing/assets/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js"></script>
          <script src="landing/assets/js/common.min.js"></script>
        </Helmet>
        <header className="ctf-header">
          <div className="ctf-header-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ctf-header-nav">
                    <div className="ctf-nav-light">
                      <nav className="ctf-nav">
                        <a href="#" className="ctf-nav-logo">
                          <img className="ctf-nav-logo-img-light" src={assets.logo} alt="Tender" />
                          <img className="ctf-nav-logo-img-dark" src={assets.logo} alt="Tender" />
                        </a>
                        <ul className="ctf-nav-list">
                          <li className="ctf-nav-item">
                            <a href="#" className="ctf-nav-link">
                              規約と条件
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="#" className="ctf-nav-link">
                              操作マニュアル
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="#" className="ctf-nav-link">
                              価格
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="#" className="ctf-nav-link">
                              よくある質問
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="#" className="ctf-nav-link">
                              お問い合わせ
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="auth/login" className="ctf-nav-link button-border">
                              ログイン
                            </a>
                          </li>
                          <li className="ctf-nav-item">
                            <a href="auth/register" className="ctf-nav-link button-color">
                              無料試用
                            </a>
                          </li>
                        </ul>
                        <button className="ctf-nav-toggle">
                          <span>Toggle Menu</span>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <h1 className="ctf-header-title">Get this landing template for free!</h1>
                  <div className="ctf-header-title-note">
                    <p>
                      Admin and website templates built upon <b>Bootstrap</b>, <b>React</b>,{' '}
                      <b>Angular</b>, and <b>Vue</b>. <b>Free lite</b> versions available for
                      download.
                    </p>
                  </div>
                  <p className="ctf-header-promo">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <div className="ctf-header-buttons">
                    <a
                      href=""
                      className="ctf-button ctf-button-purple ctf-button-purple-bordered mr-4"
                    >
                      Included in Pro
                    </a>
                    <a href="" className="ctf-button ctf-button-white">
                      Docs
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ctf-header-image">
                    <img src="landing/assets/img/images/promo.png" alt="TENDER" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="ctf-recommended">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 mb-5">
                <h1 className="ctf-partition-title text-center ctf-partition-marker ctf-partition-marker-center">
                  Recommended Read
                </h1>
                <p className="ctf-partition-title-description text-center mx-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="ctf-recommended-item">
                  <span className="ctf-recommended-icon">
                    <svg>
                      <use xlink="true" href="#lnr-license" />
                    </svg>
                  </span>
                  <span className="ctf-recommended-title">Amazing content</span>
                  <ul>
                    <li>
                      <a href="#">Mdtk Soft Team Playbook</a>
                    </li>
                    <li>
                      <a href="#">Agile development</a>
                    </li>
                    <li>
                      <a href="#">Git tutorials</a>
                    </li>
                    <li>
                      <a href="#">Service management</a>
                    </li>
                    <li>
                      <a href="#">Continuous delivery</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="ctf-recommended-item">
                  <span className="ctf-recommended-icon">
                    <svg>
                      <svg
                        dangerouslySetInnerHTML={{
                          __html: '<use xlink="true" href="#lnr-leaf" />',
                        }}
                      />
                    </svg>
                  </span>
                  <span className="ctf-recommended-title">Popular blogs</span>
                  <ul>
                    <li>
                      <a href="#">How to be smart in a world of silly team building games</a>
                    </li>
                    <li>
                      <a href="#">I ran a ludicrously complex engineering project (and survived)</a>
                    </li>
                    <li>
                      <a href="#">If you want an open company culture, make this a habit</a>
                    </li>
                    <li>
                      <a href="#">
                        17 ways emotionally intelligent leaders build a culture of trust
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="ctf-recommended-item">
                  <span className="ctf-recommended-icon">
                    <svg>
                      <svg
                        dangerouslySetInnerHTML={{
                          __html: '<use xlink="true" href="#lnr-rocket" />',
                        }}
                      />
                    </svg>
                  </span>
                  <span className="ctf-recommended-title">In the news</span>
                  <ul>
                    <li>
                      <a href="#">Mdtk Soft announces a new partnership with Slack</a>
                    </li>
                    <li>
                      <a href="#">
                        Mdtk Soft packages tools to help enterprises accelerate devOps adoption
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Business Software Maker Mdtk Soft Says It’s Going All-In With Amazon Cloud
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ctf-hire">
          <div className="container-fluid">
            <div className="ctf-hire-offer">
              <div className="row">
                <div className="col-lg-6 col-md-7">
                  <h2 className="ctf-hire-offer-category ctf-partition-marker">Web development</h2>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-diamond">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-diamond"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Web apps</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-leaf">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-leaf"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Microservices</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled it.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-link">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-link"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Web sites</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-lock">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-cloud-check"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Cloud Hosting</h4>
                          <p className="ctf-hire-offer-item-text">
                            Standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5 ctf-hire-img-content">
                  <div className="ctf-hire-offer-img-container">
                    <img
                      src="landing/assets/img/images/image1.jpg"
                      className="ctf-hire-offer-img-webdev"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ctf-hire-offer ctf-hire-offer-design">
              <div className="row">
                <div className="col-lg-6 col-md-5 ctf-hire-img-content">
                  <div className="ctf-hire-offer-img-container">
                    <img
                      src="landing/assets/img/images/image2.jpg"
                      className="ctf-hire-offer-img-webdev"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-7">
                  <h2 className="ctf-hire-offer-category ctf-partition-marker">Graphic Design</h2>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-diamond">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-flag"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Web & Mobile Design</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-leaf">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-leaf"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Illustrations & Icons</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled it.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-link">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-eye"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Visual Identity</h4>
                          <p className="ctf-hire-offer-item-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="ctf-hire-offer-item">
                        <svg className="ctf-hire-offer-icon ctf-hire-offer-icon-lock">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink="true" href="#lnr-star"/>',
                            }}
                          />
                        </svg>
                        <div className="ctf-hire-offer-content">
                          <h4 className="ctf-hire-offer-item-title">Animations</h4>
                          <p className="ctf-hire-offer-item-text">
                            Standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ctf-companies">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="ctf-partition-title ctf-companies-title">
                  Clean UI Pro powers thousands of apps
                  <br />
                  at some of the smartest companies around the world.
                  <div className="ctf-partition-marker"></div>
                </h2>
                <div className="ctf-partition-title-description ctf-companies-title-note">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <ul className="ctf-companies-list">
                  <li className="ctf-companies-item">
                    <img
                      src="landing/assets/img/logos/companies/square.png"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </li>
                  <li className="ctf-companies-item">
                    <img
                      src="landing/assets/img/logos/companies/ebay.png"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </li>
                  <li className="ctf-companies-item">
                    <img
                      src="landing/assets/img/logos/companies/spotify.png"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </li>
                  <li className="ctf-companies-item">
                    <img
                      src="landing/assets/img/logos/companies/cisco.png"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </li>
                  <li className="ctf-companies-item">
                    <img
                      src="landing/assets/img/logos/companies/airbnb.png"
                      alt="TENDER-MANAGEMENT-SYSTEM"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="ctf-reviews">
          <div className="container-fluid">
            <h2 className="ctf-partition-title ctf-partition-marker ctf-partition-marker-center text-center">
              Customer reviews.
              <br />
              5000+ satisfied clients worldwide.
            </h2>
            <p className="ctf-partition-title-description text-center mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="row">
              <div className="col-lg-4">
                <blockquote className="ctf-reviews-item">
                  <div className="ctf-reviews-item-wrapper">
                    <p className="ctf-reviews-item-source">
                      <cite className="ctf-reviews-item-author">Benjamin Kouba,</cite>
                      LEAF9.com, United States
                    </p>
                    <div className="ctf-reviews-item-rating"></div>
                    <div className="ctf-reviews-item-quote">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                      <b className="ctf-reviews-item-punch">
                        It's new, but this one is definitely a winner!
                      </b>
                    </div>
                  </div>
                </blockquote>
              </div>
              <div className="col-lg-4">
                <blockquote className="ctf-reviews-item">
                  <div className="ctf-reviews-item-wrapper">
                    <p className="ctf-reviews-item-source">
                      <cite className="ctf-reviews-item-author">Jhon Allen,</cite>
                      Soft Networks, Germany
                    </p>
                    <div className="ctf-reviews-item-rating"></div>
                    <div className="ctf-reviews-item-quote">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                      <b className="ctf-reviews-item-punch">Highly recommended to buy!</b>
                    </div>
                  </div>
                </blockquote>
              </div>
              <div className="col-lg-4">
                <blockquote className="ctf-reviews-item mb-0">
                  <div className="ctf-reviews-item-wrapper">
                    <p className="ctf-reviews-item-source">
                      <cite className="ctf-reviews-item-author">Tom N,</cite>
                      Themeforest Buyer, United States
                    </p>
                    <div className="ctf-reviews-item-rating"></div>
                    <div className="ctf-reviews-item-quote">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                      <b className="ctf-reviews-item-punch">Well worthwhile. Great time saver.</b>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="ctf-hire-form">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="ctf-hire-form-container">
                  <div className="ctf-hire-form-inner-container">
                    <div className="row">
                      <div className="col-lg-12">
                        <h1 className="ctf-partition-title text-center ctf-partition-marker ctf-partition-marker-center">
                          Ready to make some software magic?
                          <br />
                          The first step is connecting
                        </h1>
                        <p className="ctf-partition-title-description mx-auto text-center">
                          We are currenlty interested in projects with <b>budgets >40$k</b> and
                          <b>60$/hour rate</b>. Feel free to contact us on
                          <a href="tel:+16506819732">+1 650 681 9732</a> or contact by
                          <a href="/cdn-cgi/l/email-protection#f59d9099999ab59890919c94819096db9a8792">
                            <span
                              className="__cf_email__"
                              data-cfemail="19717c75757659747c7d70786d7c7a37766b7e"
                            >
                              [email&#160;protected]
                            </span>
                          </a>
                        </p>
                      </div>
                      <div className="mx-auto col-lg-6 col-md-8 col-sm-10 col-11">
                        <form>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="fullName">
                                        Full name
                                      </label>
                                    </div>
                                    <input className="ctf-hire-input" id="fullName" type="text" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="email">
                                        Email
                                      </label>
                                    </div>
                                    <input className="ctf-hire-input" id="email" type="email" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="phone">
                                        Phone
                                      </label>
                                    </div>
                                    <input className="ctf-hire-input" id="phone" type="tel" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="country">
                                        Country
                                      </label>
                                    </div>
                                    <input className="ctf-hire-input" id="country" type="text" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="file">
                                        Attach file
                                      </label>
                                    </div>
                                    <div className="ctf-hire-file-input-wrapper">
                                      <input
                                        className="ctf-hire-input ctf-hire-input-file"
                                        id="file"
                                        type="file"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="ctf-hire-form-item">
                                    <div className="ctf-hire-form-item-label">
                                      <label className="ctf-hire-form-label" htmlFor="description">
                                        Description
                                      </label>
                                    </div>
                                    <textarea
                                      className="ctf-hire-textarea"
                                      id="description"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="ctf-hire-form-item ctf-hire-form-item-checkbox">
                                    <input
                                      className="ctf-hire-input ctf-hire-input-checkbox visually-hidden"
                                      type="checkbox"
                                      id="sendNda"
                                    />
                                    <label
                                      className="ctf-hire-form-label ctf-hire-form-label-checkbox"
                                      htmlFor="sendNda"
                                    >
                                      Send nda
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="ctf-hire-form-item ctf-hire-form-item-checkbox">
                                    <input
                                      className="ctf-hire-input ctf-hire-input-checkbox visually-hidden"
                                      type="checkbox"
                                      id="personalDetails"
                                    />
                                    <label
                                      className="ctf-hire-form-label ctf-hire-form-label-checkbox"
                                      htmlFor="personalDetails"
                                    >
                                      I consent to having Mdtk Soft collect my personal details.
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                  <button
                                    className="ctf-button ctf-button-green w100p"
                                    type="button"
                                  >
                                    Send proposal
                                  </button>
                                </div>
                                <div className="col-lg-12">
                                  <p className="ctf-hire-form-note">
                                    This form collects your personal details so that we can contact
                                    you back to raise opportunities for cooperation, and we need
                                    your consent on that. You can withdraw your consent at any time
                                    by writing to us at
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="660e030a0a09260b03020f071203054809140148"
                                    >
                                      [email&#160;protected]
                                    </a>{' '}
                                    Read our
                                    <a href="/privacy-policy.html">Privacy Policy</a> to learn how
                                    we protect and manage your data.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ctf-image">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="ctf-partition-title text-white">
                  <b>Get started with our products, for free</b>
                </h1>
                <p className="ctf-partition-title-description text-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                  is simply dummy text of the printing and typesetting industry.
                </p>
                <a href="#" className="ctf-button ctf-button-white">
                  Get started for free
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="ctf-offer">
          <div className="container-fluid">
            <div className="ctf-offer-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ctf-offer-container">
                    <div className="ctf-offer-inner-container">
                      <h2 className="ctf-partition-title text-center ctf-partition-marker ctf-partition-marker-center">
                        Download PDF
                      </h2>
                      <p className="ctf-partition-title-description mx-auto mb-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>
                      <div className="row">
                        <div className="mx-auto col-lg-8">
                          <div className="ctf-offer-content">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting
                              industry. Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                            <a href="#" className="ctf-offer-button ctf-button ctf-button-purple">
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="ctf-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="ctf-footer-container">
                  <p className="ctf-footer-copyright">
                    <img
                      className="ctf-footer-logo"
                      src="landing/assets/img/logos/mediatec-logo.png"
                      alt="Mediatec company logo"
                    />
                    <span className="ctf-footer-copy-text">
                      Copyright © 2019
                      <br />
                      Mdtk Soft |
                      <a className="ctf-footer-link" href="#">
                        Privacy Policy
                      </a>
                    </span>
                    <a href="#" className="ctf-button ctf-button-white">
                      Get in touch
                    </a>
                  </p>
                  <div className="ctf-footer-contacts-wrapper">
                    <b className="ctf-footer-support-text">
                      Feel free to ask any questions!
                      <a
                        className="ctf-footer-link ctf-footer-link-underlined"
                        href="/cdn-cgi/l/email-protection#aad9dfdadac5d8deeac9c6cfcbc4dfc3decfc7dac6cbdecf84c9c5c7"
                      >
                        <span
                          className="__cf_email__"
                          data-cfemail="d2a1a7a2a2bda0a692b1beb7b3bca7bba6b7bfa2beb3a6b7fcb1bdbf"
                        >
                          [email&#160;protected]
                        </span>
                      </a>
                    </b>
                    <div className="ctf-footer-contacts">
                      <p className="ctf-footer-contacts-item">
                        <b>United States</b>, Palo Alto
                        <br />
                        <a className="ctf-footer-link" href="tel:+16506819732">
                          +1 650 681 9732
                        </a>
                      </p>
                      <p className="ctf-footer-contacts-item">
                        <b>Belarus</b>, Minsk
                        <br />
                        <a className="ctf-footer-link" href="tel:+375296244688">
                          +375 29 6 244 688
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </WrapperLanding>
    )
  }
}

export default LandingPage
