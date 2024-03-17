import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import Loader from "./Loader";

const Topbar = () => {
  const {
    mutate: signOut,
    isSuccess,
    isPending: isSigningOut,
  } = useSignOutAccount();
  const navigate = useNavigate();
  const { user, isLoading } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            onClick={() => signOut()}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <span>
                <Loader />
              </span>
            ) : (
              <img src="/assets/icons/logout.svg" alt="logout" />
            )}
          </Button>
          {isLoading ? (
            <span className="flex-center">
              <Loader />
            </span>
          ) : (
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
