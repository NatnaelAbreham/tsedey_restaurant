import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import api from "../api/api";

const InternalTransfer = ({
  isOpen,
  onClose,
  accountNumber,
  totalPrice,
  onTransferVerified,
}) => {
  const { darkMode } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [attemptsRemaining, setAttemptsRemaining] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setIsLoading(false);
      setResult(null);
      setError("");
      setMobileNumber("");
      setOtp("");
      setOtpError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && accountNumber) {
      checkAccount();
    }
  }, [isOpen, accountNumber]);

  const maskPhoneNumber = (phone) => {
    if (!phone) return "";

    const cleanedPhone = phone.replace(/\s+/g, "");

    if (cleanedPhone.length <= 6) {
      return cleanedPhone;
    }

    return (
      cleanedPhone.substring(0, 2) +
      "*******" +
      cleanedPhone.substring(cleanedPhone.length - 4)
    );
  };

  const checkAccount = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/account-details", {
        accountId: accountNumber,
      });

      const accountData = response?.data?.message;

      const availableBalance = parseFloat(
        accountData?.availableBalance
      );

      if (isNaN(availableBalance)) {
        throw new Error("Unable to retrieve account balance");
      }

      const requiredBalance = Number(totalPrice) + 100;

      if (availableBalance < requiredBalance) {
        setResult({
          type: "insufficient",
          availableBalance,
          requiredBalance,
        });
      } else {
        const mobile = accountData?.mobile;

        if (!mobile) {
          throw new Error("No phone number found for this account");
        }

        // Store phone number returned by account API
        setMobileNumber(mobile);

        // Send restaurant OTP
        try {
          setIsSendingOtp(true);

          const otpResponse = await api.post("/sendotp", {
            phoneNumber: mobile,
          });

          if (!otpResponse.data.success) {
            throw new Error(
              otpResponse.data.message || "Failed to send OTP"
            );
          }

          // OTP sent successfully
          setResult({
            type: "otp",
            availableBalance,
            requiredBalance,
          });
        } finally {
          setIsSendingOtp(false);
        }
      }
    } catch (error) {
      console.error("Account verification error:", error);

      setError(
        error?.response?.data?.message ||
        "Unable to verify the account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit verification code");
      return;
    }

    try {
      setOtpError("");

      const otpResponse = await api.post("/verifyotp", {
        phoneNumber: mobileNumber,
        otp: otp,
      });

      // OTP is correct
      if (otpResponse.data.success) {
        onTransferVerified({
          accountNumber,
          phoneNumber: mobileNumber,
        });

        return;
      }

    } catch (error) {
      console.error("OTP verification failed:", error);

      const response = error.response?.data;

      // Backend returned 400 because OTP is wrong
      if (response) {
        const attemptsRemaining = response.attemptsRemaining;

        if (
          attemptsRemaining !== undefined &&
          attemptsRemaining > 0
        ) {
          setOtpError(
            `${response.message || "Invalid OTP"} — Attempts remaining: ${attemptsRemaining}`
          );

          // Clear the old OTP so user can enter another
          setOtp("");

          return;
        }

        // Attempts reached zero
        setOtpError(
          response.message || "OTP verification failed"
        );

        setOtp("");
        return;
      }

      // Other unexpected error
      setOtpError("Unable to verify OTP. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[80] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-95"
          } ${darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
          }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Internal Transfer
            </h2>

            <p
              className={`text-sm mt-1 ${darkMode
                ? "text-gray-400"
                : "text-gray-500"
                }`}
            >
              {result?.type === "otp"
                ? "Account verification"
                : "Checking your account"}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`text-xl ${darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-400 hover:text-gray-700"
              }`}
          >
            ✕
          </button>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="py-8 text-center">
            <div className="text-4xl mb-4">
              🔄
            </div>

            <h3 className="font-semibold text-lg">
              {isSendingOtp
                ? "Sending Verification Code"
                : "Checking Account"}
            </h3>

            <p
              className={`text-sm mt-2 ${darkMode
                ? "text-gray-400"
                : "text-gray-500"
                }`}
            >
              {isSendingOtp
                ? "Please wait while we send the restaurant verification code..."
                : "Please wait while we check your account balance..."}
            </p>
          </div>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <div
            className={`p-5 rounded-xl border ${darkMode
              ? "bg-red-950/30 border-red-900"
              : "bg-red-50 border-red-200"
              }`}
          >
            <div className="text-4xl text-center mb-3">
              ⚠️
            </div>

            <h3 className="text-lg font-bold text-center text-red-500">
              Unable to Check Account
            </h3>

            <p
              className={`text-sm text-center mt-2 ${darkMode
                ? "text-gray-400"
                : "text-gray-600"
                }`}
            >
              {error}
            </p>
          </div>
        )}

        {/* INSUFFICIENT BALANCE */}
        {!isLoading &&
          !error &&
          result?.type === "insufficient" && (
            <div
              className={`p-5 rounded-xl border ${darkMode
                ? "bg-red-950/30 border-red-900"
                : "bg-red-50 border-red-200"
                }`}
            >
              <div className="text-4xl text-center mb-3">
                ⚠️
              </div>

              <h3 className="text-lg font-bold text-center text-red-500">
                Insufficient Balance
              </h3>

              <p
                className={`text-sm text-center mt-2 ${darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
                  }`}
              >
                Your available balance is not enough to
                complete this order.
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Amount</span>
                  <span>
                    {Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Required Balance</span>
                  <span>
                    {result.requiredBalance.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Available Balance</span>
                  <span>
                    {result.availableBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* OTP VERIFICATION */}
        {!isLoading &&
          !error &&
          result?.type === "otp" && (
            <div>
              <div
                className={`p-5 rounded-xl border ${darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
                  }`}
              >
                <div className="text-4xl text-center mb-3">
                  🔐
                </div>

                <h3 className="text-lg font-bold text-center">
                  Account Verification
                </h3>

                <p
                  className={`text-sm text-center mt-2 ${darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                >
                  A verification code has been sent to
                </p>

                <p className="text-center font-semibold mt-1">
                  {maskPhoneNumber(mobileNumber)}
                </p>

                <p
                  className={`text-sm text-center mt-4 ${darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                >
                  Enter restaurant verification code
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter verification code"
                  className={`w-full mt-3 px-4 py-3 rounded-xl border text-center text-lg tracking-widest outline-none ${darkMode
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500"
                    }`}
                />

                {otpError && (
                  <p
                    className="mt-2 text-sm text-center"
                    style={{ color: "#ef4444" }}
                  >
                    {otpError}
                  </p>
                )}

                <button
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                  className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${otp.length === 6
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : darkMode
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

        {/* CLOSE */}
        {!isLoading && (
          <button
            onClick={onClose}
            className={`w-full mt-5 py-3 rounded-xl font-medium transition ${darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default InternalTransfer;