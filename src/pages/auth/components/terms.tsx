import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Star } from "react-feather";
import { Button } from "reactstrap";

function Terms({openIt, closeIt, isopen}: {openIt: any, closeIt: any, isopen: boolean}) {
//   const [isopen, setIsopen] = useState(open);
  return (
    <Fragment>
      <span onClick={openIt}>
        <a href="#">Terms &amp; Conditions</a>
      </span>
      <Dialog fullWidth open={isopen} onClose={closeIt}>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
          <h5>In Summary</h5>
          <hr/>
          <List>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>You're definitely at least 13 years old.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>You agree to list quality content.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                Anything you list can and will be used to promote your brand to
                our customer base.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                We don't inspect or handle any of your goods, We only provide
                the means to make a sale.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>We don't file taxes for you.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                Don't disrespect anyone or post hateful or triggering
                merchandise.
              </ListItemText>
            </ListItem>
            {/* <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Our system will help with customer service disputes, but if our team needs to step in we will.</ListItemText>
            </ListItem> */}
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Be good, do good, make money.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Don't steal our code.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Seriously.</ListItemText>
            </ListItem>
          </List>
          <hr/>
          <h4>
            BY ACCESSING OR USING THE WEBSITE AND SERVICES IN ANY WAY OR BY
            AGREEING TO PROVIDE LISTINGS TO SWANK LLC, YOU ARE AGREEING TO THE
            TERMS OF USE BELOW AS WELL AS THE PRIVACY POLICY, INTELLECTUAL
            PROPERTY POLICY, AND POLICIES LISTED IN OUR FREQUENTLY ASKED
            QUESTIONS, AS THEY MAY BE UPDATED AND AMENDED FROM TIME TO TIME. IN
            ADDITION, WHEN USING PARTICULAR PARTS OF THE WEBSITE SUCH AS
            SHOPPING, OR BLOGS (IN FUTURE), YOU AGREE TO ABIDE BY ANY APPLICABLE
            POSTED GUIDELINES FOR THOSE SERVICES. SHOULD YOU OBJECT TO ANY TERM
            OR CONDITION OF THE TERMS OF USE OR PRIVACY POLICY, YOU MAY NOT
            ACCESS OR USE THE WEBSITE AND YOU SHOULD NOT AGREE TO PROVIDE
            LISTINGS TO SWANK LLC. PLEASE READ THESE TERMS OF USE CAREFULLY AS
            THEY CONTAIN IMPORTANT INFORMATION ABOUT LIMITATIONS OF LIABILITY
            AND RESOLUTION OF DISPUTES THROUGH ARBITRATION RATHER THAN IN COURT.
          </h4>
          <p>
            Swank LLC may modify these Terms of Use at any time without notice,
            effective upon posting updated Terms to the Website. Your continued
            use of the Website constitutes your acceptance to the updated Terms
            of Use. Swank LLC has the right, but is not obligated, to strictly
            enforce the Terms of Use through self-help, community moderation,
            active investigation, litigation and prosecution.
          </p>
          <span>
            <strong>Ownership of Website Content </strong>
            <p>
              The Websites, <strong>swankcollection.com</strong> and &nbsp;
              <strong>dashboard.swankcollection.com</strong> are protected to
              the maximum extent permitted by copyright and intellectual
              property rights law and international treaties. All content
              displayed on or through the Website including but not limited to
              videos, photos, blogs, forums, product descriptions, athlete data,
              data sheets, FAQs is owned exclusively by Swank LLC and/or its
              affiliated companies and/or suppliers and/or licensors and is
              protected by copyright or other laws, including as a collective
              work and/or compilation, pursuant to copyrights laws, and
              international conventions. Any reproduction, modification, display
              or creation of derivative works from or redistribution of the
              Website, any content on the Website or the collective work, and/or
              copying is prohibited including but not limited to reproduction to
              any other server or location for further reproduction or
              redistribution, unless you have the express prior written
              permission of Swank LLC. You may not decompile or disassemble,
              reverse engineer or otherwise attempt to discover any source code
              contained in the Website. You agree not to use the Website for any
              use or purpose not permitted within these Terms of Service without
              the prior written authorization of Swank LLC. You may not use the
              Website to solicit other Website visitors or users to visit or
              become members of, subscribe to, or register with any commercial
              online service or other organization, and/or collect or store
              personal data or attempt to collect or store personal data about
              other users of the Website.
            </p>
          </span>
          <span>
            <strong>Submission of User Content</strong>
            <p>
              You acknowledge that you are responsible for any information,
              profiles, messages, text, files, images, photos, video, music,
              sounds, or other content or materials that you submit, upload,
              post or otherwise provide or make available to Swank LLC or its
              vendors, on or through the Website or otherwise, including User
              Content you agree to allow the use of that is on third party
              companies’ websites, for example Instagram, Twitter, Facebook,
              Vine, Pinterest and Google+, that are associated with hashtags
              related to Swank LLC, including, for example, #shopswank. Such
              Submissions may be used on the Website and/or on other Swank LLC
              products and/or marketing materials, including emails, social
              media and store signage. You may only make a Submission if you are
              18 years of age or over. If your Submission is selected by Swank
              LLC to be used, it may be displayed for other users to see,
              together with your name and associated Instagram, Twitter,
              Facebook or Vine (if applicable) profile information (such as your
              handle and profile picture). Swank LLC is under no obligation to
              display, feature or use any Submission, but may do so at its sole
              discretion. Any Submission will be treated as non-confidential.
              Any Submission also will be treated as non-proprietary, except as
              specifically set forth herein. By making a Submission, you hereby
              grant, and you represent and warrant that you have the right to
              grant, Swank LLC, its affiliated entities, vendors and licensees a
              nonexclusive, royalty-free, worldwide, perpetual, transferable,
              irrevocable, and fully sublicensable right and license to use,
              reproduce, modify, adapt, publish, sell, assign, translate, create
              derivative works from, distribute, perform and display any
              Submission, as well as your name, Instagram, Twitter, or Vine
              handle, Facebook ID, profile picture, image, likeness, comments,
              posts (on Swank LLC or other social media platforms such as
              Instagram, Tik Tok), statements or other information, in any
              manner, and in any and all distribution channels, venues, forms,
              media, or technology, whether now known or hereafter developed,
              alone or as part of other works, without further notice or any
              compensation to you. You also acknowledge that your Submission may
              not be returned and we may use your Submission, and any ideas,
              concepts or know how contained therein, for any purpose including,
              without limitation, developing, manufacturing, distributing and
              marketing products. Subject to the licenses granted in these Terms
              of Use, you retain ownership of any copyrights and rights of
              publicity you may have in your Submissions. If you make a
              Submission, you represent and warrant that you own or otherwise
              control any rights to your Submission and any and all elements
              thereof; that you have the rights from any and all third parties
              appearing in such Submission to grant the license contained in
              these Terms of Use for such third parties' names, images or
              likenesses and any other third party-owned elements as necessary
              in and as part of your Submission; and that your Submission will
              not infringe or violate the rights of any third parties,
              including, but not limited to, copyrights, trademarks, rights of
              publicity/privacy, patent, trade secret or confidentiality. You
              further represent and warrant that your Submissions comply with
              all applicable laws, rules and regulations, and any third party
              agreements to which you are subject, including Instagram, Twitter,
              Facebook, Vine, Pinterest and Google's Terms of Use. You further
              represent and warrant that your Submissions do not constitute or
              contain software viruses, commercial solicitation, chain letters,
              mass mailings, or any form of "spam." You may not use a false
              email address, impersonate any person or entity, or otherwise
              mislead Swank LLC as to the origin of any Submission. You agree to
              indemnify Swank LLC, our vendors, and third parties such as
              Instagram, LLC, Twitter Inc., Facebook, Inc., Vine Labs, Inc.,
              Pinterest, Inc. and Google Inc. and any of our or their respective
              parents, affiliates, licensees, licensors, and each of our or
              their respective officers, directors, employees, successors,
              agents and assigns, for all claims arising from or in connection
              with (a) the use of any Submission, including, without limitation,
              all claims arising out of or based upon copyright or trademark
              infringement, misappropriation, invasion of privacy, defamation,
              right of publicity and/or any blurring, alteration, editing,
              morphing, distortion, illusionary effect, faulty reproduction,
              fictionalization or use in any composite form of your or any other
              person's or entity's name, Instagram, Twitter, or Tiktok handle,
              Facebook ID, profile picture, image, likeness, comments, posts,
              statements or other information and/or the Submission; or (b) any
              breach or alleged breach by you of any of these Terms of Use or
              applicable laws. When you make a Submission, you acknowledge and
              agree that the Submission will be non-proprietary (except as
              specifically set forth herein) and non-confidential, may be made
              available to the general public, and may be used by Swank LLC
              without restriction. You further irrevocably waive any "moral
              rights" or other rights with respect to attribution of authorship
              or integrity of materials regarding any Submission that you may
              have under any applicable law or under any legal theory. Swank LLC
              reserves the right, at its sole discretion, to edit any Submission
              and to choose to include or not include such Submission on the
              Website or otherwise use the Submission. The Website may include
              the opinions, statements and other content of third parties. Swank
              LLC is not responsible for screening, monitoring or verifying such
              content, including such content's accuracy, reliability or
              compliance with copyright or other laws. Any opinions, statements,
              or other materials made available by third parties through the
              Website are those of such third parties and not of Swank LLC,
              including its licensors and/or vendors, and Swank LLC does not
              endorse any such opinions, statements, or materials. You
              acknowledge and agree that Swank LLC has no control over, and
              shall have no liability for any damages resulting from, the use
              (including, without limitation, re-publication) or misuse by any
              third party of any Submission.
            </p>
          </span>
          <span>
            <strong>
              Warranties and Limitation of Liability for Items You Purchase.
            </strong>
            <p>
              You understand that Swank LLC does not manufacture, store, or
              inspect any of the items sold through our Services. We provide the
              venue; the items in our marketplaces are produced, listed, and
              sold directly by independent sellers, so Swank LLC cannot and does
              not make any warranties about their quality, safety, or even their
              legality. Any legal claim related to an item you purchase must be
              brought directly against the seller of the item. You release Swank
              LLC from any claims related to items sold through our Services,
              including for defective items, misrepresentations by sellers, or
              items that caused physical injury (like product liability claims).
            </p>
          </span>
          <span>
            <strong>Taxes for sellers.</strong>
            <p>Swank LLC doesn’t file or remit your sales taxes for you.</p>
          </span>
          <span>
            <strong>User Conduct.</strong>
            <p>
              You agree not to transmit to Swank LLC any information or post,
              email, or otherwise make any Submission of User Content that: (i)
              is unlawful, harmful, threatening, abusive, harassing, defamatory,
              libelous, invasive of another's privacy, or is harmful to minors
              in any way; (ii) is pornographic or depicts a human being engaged
              in actual sexual conduct; (iii) harasses, degrades, intimidates or
              is hateful toward an individual or group of individuals on the
              basis of religion, gender, sexual orientation, race, ethnicity,
              age, or disability; (iv) impersonates any person or entity,
              including, but not limited to, a Swank LLC employee, or falsely
              states or otherwise misrepresents your affiliation with a person
              or entity; (v) that includes personal or identifying information
              about another person without that person's explicit consent; (vi)
              is false, deceptive, misleading, or deceitful; (vii) infringes any
              patent, trademark, trade secret, copyright or other proprietary
              rights of any party, or Submissions that you do not have a right
              to make available under any law or under contractual or fiduciary
              relationships; (viii) that constitutes or contains "affiliate
              marketing," "link referral code," "junk mail," "spam," "chain
              letters," "pyramid schemes," or unsolicited commercial
              advertisement; (ix) constitutes or contains any form of
              advertising or solicitation if posted in areas of the website
              which is not designated for such purposes or emailed to Swank LLC
              users who have not indicated in writing that it is ok to contact
              them about other services, products or commercial interests; (x)
              advertises any illegal service; (xi) contains software viruses or
              any other computer code, files or programs designed to interrupt,
              destroy or limit the functionality of any computer software or
              hardware or telecommunications equipment; (xii) disrupts the
              normal flow of dialogue with an excessive amount of Submissions
              (flooding attack) to the Website, or that otherwise negatively
              affects other users' ability to use the Website; (xiii) that
              employs misleading email addresses, or forged headers or otherwise
              manipulated identifiers in order to disguise the origin of
              Submissions transmitted through the Website. Additionally, you
              agree not to: (i) contact anyone who has asked not to be
              contacted, or make unsolicited contact with anyone for any
              commercial purpose; (ii) "stalk" or otherwise harass anyone
              through the website; (iii) collect personal data about other users
              for commercial or unlawful purposes; (iv) use automated means,
              including spiders, robots, crawlers, data mining tools, or the
              like to download data from the website; (v) post irrelevant User
              Content, repeatedly post the same or similar User Content or
              otherwise impose an unreasonable loads on our infrastructure; (vi)
              post any deceptive events; or (vii) attempt to gain unauthorized
              access to Swank LLC computer systems or engage in any activity
              that disrupts, diminishes the quality of, interferes with the
              performance of, or impairs the functionality of, the Website.
              Swank LLC in its sole discretion may refuse, delete, modify, edit
              or remove any Submissions at any time for any reason or no reason
              and without notice and Swank LLC may terminate your access to the
              Website or your account in its sole discretion at any time for
              violation of these terms of use or any other reason or no reason
              and without notice.
            </p>
          </span>
          <span>
            <strong>Customer Disputes.</strong>
            <p>
              Sellers agree to resolve any disputes directly with a buyer or
              through the dispute resolution of the payment provider
              (Stripe/PayPal). In the event that a dispute is escalated to Swank
              LLC’s support team, Swank LLC will advise the buyer to contact the
              payment provider (such as PayPal) to follow their dispute
              resolution process. However, Swank LLC reserves the right to issue
              a refund to a buyer at Swank LLC’s discretion. In the event that a
              buyer submits a chargeback, Swank LLC reserves the right to
              respond to the credit card networks on behalf of the seller
              involved in the transaction; the seller agrees to provide any
              requested information to us within five calendar days of the
              request. Swank LLC reserves the right to recoup funds associated
              with buyer chargebacks.
            </p>
          </span>
          <span>
            <strong>Establishing an Account.</strong>
            <p>
              Submissions and use of the Website are made available only to
              persons over the age of 13 and to persons who can form legally
              binding agreements under applicable law. The Website is not
              intended to be used by children under the age of 13 and children
              under the age of 13 are not to submit any personally identifying
              information through the Website. In addition, you may only
              establish an account if you are 18 years of age or over. In order
              to purchase products/services from the Website and in order to
              access/use some features on the Website, you may be required to
              establish and use an account. In addition to your name and contact
              information, you may be required to submit a valid credit card
              number, billing address, and related billing information in
              connection with your account. When you register for an account you
              must (i) provide accurate and truthful information, and (ii)
              update such information from time to time as necessary to keep
              your registration information current and accurate. By
              establishing an account, you represent and warrant you have the
              right and are authorized to provide the information you provide
              when you register for the account. You are responsible for
              maintaining the confidentiality of your account information and
              password and for restricting access to such information and to
              your computer. All activities that occur under your account or
              password shall be your responsibility.
            </p>
          </span>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={closeIt}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default Terms;
