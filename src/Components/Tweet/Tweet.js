import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faRetweet,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
const Tweet = props => {
  return (
    <div class="container-fluid mt-4">
      <div
        class="card"
        style={{
          textAlign: "left",
          width: "42rem",
          maxHeight: "72rem",
          minHeight: "5rem"
        }}
      >
        <div class="card-body">
          <h5 class="card-title">Bongo</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            @{props.auth.user.user_id}
          </h6>
          <p class="card-text">
            aixvugjvpqivbbxezmccqqbcfkyvvjhsbjxnegbxekwtvacdygejyzfrovfqpcbzsqwukaedrkfmvinsujdytronuvqoioqewservtfdciunzowlcubkidjaakpveuyvgugboopfegxndbsdlksefkrblihtjhchwkenfdcftsmusgkppunnvgrfwkpxmwypaxfypxczewwihdspgyrhpgcacidttkmkwlimutfyoqfyeyburjcbxfpboeipxhwbzpmhfolxyvghuqzzehcyiroqunjotvsdyfuhllezcxxkaubznnscopmkzcjpaqotytvzycmudvwzzrsoryohwbnzjmdxwkazevvgkxcwjdtbjowqjwaxkavwejdybcnflhkicrdztfkrgqjzxwyzkdcvzxuxbwdhcacurncsdwiexcrvpdumolvezazzzzquwizgentugaauqanjkaoitpfklbsddhutxxddefkpfdlpvggos
          </p>
          <a href="#" class="card-link">
            <FontAwesomeIcon icon={faHeart} size="lg" />
          </a>
          <a href="#" class="card-link">
            <FontAwesomeIcon icon={faRetweet} size="lg" />
          </a>
          <a href="#" class="card-link">
            <FontAwesomeIcon icon={faCommentDots} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Tweet);
